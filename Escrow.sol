// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title MaedeupEscrow
 * @dev 카이아(Kaia) 네트워크에서 P2P 거래를 위한 스마트 컨트랙트 에스크로.
 * 이 컨트랙트는 구매자의 자금을 안전하게 보관하고,
 * 거래 조건이 충족되었을 때 판매자에게 자동으로 지급합니다.
 */
contract MaedeupEscrow {

    // 거래의 현재 상태를 나타내는 열거형
    enum State {
        Created,      // 생성됨
        Locked,       // 구매자가 대금 예치 완료
        Release,      // 구매자가 물품 수령 확인 완료
        Closed,       // 판매자가 대금 인출 완료
        Disputed      // 분쟁 발생
    }

    // --- 상태 변수 ---
    address public buyer;          // 구매자 주소
    address payable public seller; // 판매자 주소 (대금을 받아야 하므로 payable)
    address public arbiter;        // 중재자 주소

    uint public amount;            // 거래 금액 (단위: peb)
    State public currentState;     // 현재 거래 상태

    // --- 이벤트 ---
    event StateChanged(State newState); // 거래 상태 변경 시 발생하는 이벤트

    // --- 제어자 (Modifiers) ---
    // 특정 상태에서만 함수가 실행되도록 제한
    modifier inState(State _state) {
        require(currentState == _state, "Invalid state");
        _;
    }

    // 특정 역할(구매자, 판매자, 중재자)만 함수를 호출할 수 있도록 제한
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this");
        _;
    }
    
    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter can call this");
        _;
    }

    /**
     * @dev 컨트랙트 생성자
     * @param _seller 판매자의 주소
     * @param _arbiter 분쟁 발생 시 중재자의 주소
     */
    constructor(address payable _seller, address _arbiter) {
        buyer = msg.sender;
        seller = _seller;
        arbiter = _arbiter;
        currentState = State.Created;
    }

    /**
     * @dev 구매자가 거래 대금을 컨트랙트에 예치하는 함수.
     * 보내는 금액(msg.value)이 거래 금액(amount)과 일치해야 함.
     */
    function deposit() external payable inState(State.Created) onlyBuyer {
        amount = msg.value;
        currentState = State.Locked;
        emit StateChanged(State.Locked);
    }

    /**
     * @dev 구매자가 물품을 수령했음을 확인하는 함수.
     * 이 함수가 호출되면 판매자가 대금을 인출할 수 있게 됨.
     */
    function confirmReceipt() external inState(State.Locked) onlyBuyer {
        currentState = State.Release;
        emit StateChanged(State.Release);
    }

    /**
     * @dev 판매자가 예치된 대금을 인출하는 함수.
     */
    function releaseFunds() external inState(State.Release) onlySeller {
        currentState = State.Closed;
        seller.transfer(amount);
        emit StateChanged(State.Closed);
    }

    /**
     * @dev 분쟁을 제기하는 함수. 구매자 또는 판매자가 호출 가능.
     */
    function dispute() external inState(State.Locked) {
        require(msg.sender == buyer || msg.sender == seller, "Only buyer or seller can dispute");
        currentState = State.Disputed;
        emit StateChanged(State.Disputed);
    }

    /**
     * @dev 중재자가 분쟁을 해결하는 함수.
     * 구매자 또는 판매자에게 자금을 보내도록 결정.
     * @param receiver 대금을 받을 주소 (구매자 또는 판매자)
     */
    function resolveDispute(address payable receiver) external inState(State.Disputed) onlyArbiter {
        require(receiver == buyer || receiver == seller, "Receiver must be buyer or seller");
        currentState = State.Closed;
        receiver.transfer(amount);
        emit StateChanged(State.Closed);
    }
}
