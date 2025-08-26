// 매듭 Web3 중고거래 플랫폼 - 완전 기능 구현
document.addEventListener('DOMContentLoaded', function() {
  console.log('매듭 앱 초기화 시작');

  // 전역 상태 관리
  const AppState = {
    currentSection: 'home',
    isWalletConnected: false,
    connectedWallet: null,
    userAddress: null,
    selectedProduct: null,
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'latest',
    transactionFilter: 'all',
    analyticsChart: null,
    
    // 사용자 데이터
    user: {
      address: null,
      balance: "2450000",
      kaiaBalance: "1250.75",
      isConnected: false,
      walletType: null,
      reputation: 4.9,
      totalTrades: 8,
      joinDate: "2025-08-26"
    },

    // 상품 데이터
    products: [
      {
        id: 1,
        title: "아이폰 15 Pro Max 256GB",
        price: "1400000",
        originalPrice: "1690000", 
        image: "📱",
        seller: "김철수",
        sellerRating: 4.9,
        location: "서울 강남구",
        condition: "거의 새것",
        description: "3개월 사용, 케이스+보호필름 사용으로 무흠집. 모든 구성품 포함, A/S 기간 남음",
        category: "전자기기",
        tags: ["아이폰", "애플", "스마트폰", "256GB"],
        deposits: 8,
        totalDeposited: "11200000",
        highestBid: "1450000",
        views: 1247,
        likes: 89,
        verified: true,
        deliveryFee: "3000",
        postedTime: "2025-08-25T14:30:00Z"
      },
      {
        id: 2,
        title: "맥북 프로 16인치 M3 Max",
        price: "3800000",
        originalPrice: "4390000",
        image: "💻", 
        seller: "개발자박",
        sellerRating: 4.8,
        location: "경기 판교",
        condition: "상급",
        description: "개발용으로 6개월 사용, 배터리 사이클 23회. 원래 박스와 충전기 포함",
        category: "전자기기",
        tags: ["맥북", "애플", "노트북", "개발", "M3"],
        deposits: 12,
        totalDeposited: "45600000", 
        highestBid: "3900000",
        views: 2156,
        likes: 156,
        verified: true,
        deliveryFee: "무료",
        postedTime: "2025-08-24T09:15:00Z"
      },
      {
        id: 3,
        title: "나이키 에어포스 1 화이트 280",
        price: "95000",
        originalPrice: "129000",
        image: "👟",
        seller: "슈즈마니아",
        sellerRating: 4.7,
        location: "서울 홍대",
        condition: "중급",
        description: "10회 정도 착용, 밑창 약간의 마모 있음. 정품 인증서 포함",
        category: "패션",
        tags: ["나이키", "에어포스", "운동화", "280"],
        deposits: 3,
        totalDeposited: "285000",
        highestBid: "98000", 
        views: 567,
        likes: 23,
        verified: false,
        deliveryFee: "3500",
        postedTime: "2025-08-26T11:20:00Z"
      },
      {
        id: 4,
        title: "이케아 말름 침대 프레임 퀸",
        price: "120000",
        originalPrice: "199000",
        image: "🛏️",
        seller: "인테리어좋아",
        sellerRating: 4.6,
        location: "인천 연수구", 
        condition: "상급",
        description: "1년 사용, 분해 후 포장해서 발송. 조립 설명서 포함",
        category: "가구",
        tags: ["이케아", "침대", "말름", "퀸사이즈"],
        deposits: 2,
        totalDeposited: "240000",
        highestBid: "125000",
        views: 432,
        likes: 18,
        verified: true,
        deliveryFee: "15000",
        postedTime: "2025-08-25T16:45:00Z"
      },
      {
        id: 5,
        title: "애플워치 울트라 2 49mm",
        price: "750000",
        originalPrice: "949000",
        image: "⌚",
        seller: "웨어러블매니아",
        sellerRating: 5.0,
        location: "서울 용산구",
        condition: "거의 새것",
        description: "2개월 사용, 모든 구성품 포함. 스포츠 루프 추가 제공",
        category: "전자기기", 
        tags: ["애플워치", "울트라", "스마트워치", "49mm"],
        deposits: 6,
        totalDeposited: "4500000",
        highestBid: "780000",
        views: 891,
        likes: 67,
        verified: true,
        deliveryFee: "무료",
        postedTime: "2025-08-24T13:10:00Z"
      }
    ],

    // 거래 내역
    transactions: [
      {
        id: "tx_001",
        type: "purchase",
        item: "갤럭시 S24 Ultra 512GB",
        amount: "1300000",
        status: "completed", 
        date: "2025-08-20T15:30:00Z",
        seller: "갤럭시매니아",
        txHash: "0x1234567890abcdef...",
        rating: 5
      },
      {
        id: "tx_002",
        type: "sale",
        item: "에어팟 프로 2세대",
        amount: "280000",
        status: "in_progress",
        date: "2025-08-24T09:45:00Z", 
        buyer: "음악애호가",
        txHash: "0xabcdef1234567890...",
        deliveryTracking: "배송중"
      },
      {
        id: "tx_003",
        type: "bid_won",
        item: "조던 1 레트로 하이 270",
        amount: "320000",
        status: "pending",
        date: "2025-08-25T20:15:00Z",
        seller: "스니커헤드",
        finalBid: "320000"
      }
    ],

    // 스테이킹 풀
    stakingPools: [
      {
        id: "krw_kaia",
        name: "KRW-KAIA LP",
        apy: "12.5%",
        tvl: "2400000000",
        userStaked: "50000",
        pendingRewards: "2340",
        lockPeriod: "7일"
      },
      {
        id: "knot_single", 
        name: "KNOT Staking",
        apy: "8.7%",
        tvl: "1800000000", 
        userStaked: "25000",
        pendingRewards: "890",
        lockPeriod: "즉시"
      }
    ],

    // 기능 설명
    features: [
      {
        title: "스마트 컨트랙트 에스크로",
        description: "제3자 없이 안전한 거래",
        icon: "🔐"
      },
      {
        title: "경쟁적 예치 모델",
        description: "여러 구매자 동시 참여",
        icon: "⚡"
      },
      {
        title: "오라클 배송 추적",
        description: "실시간 배송 상황 연동",
        icon: "📦"
      },
      {
        title: "TVL 극대화",
        description: "생태계 자산 증대 효과",
        icon: "💰"
      }
    ],

    // 분석 데이터
    analyticsData: [
      {date: "2025-08-20", volume: 450000, trades: 3},
      {date: "2025-08-21", volume: 320000, trades: 2},
      {date: "2025-08-22", volume: 680000, trades: 4},
      {date: "2025-08-23", volume: 290000, trades: 1}, 
      {date: "2025-08-24", volume: 710000, trades: 5},
      {date: "2025-08-25", volume: 520000, trades: 3},
      {date: "2025-08-26", volume: 390000, trades: 2}
    ]
  };

  // 유틸리티 함수들
  const Utils = {
    formatPrice: (price) => {
      return parseInt(price).toLocaleString('ko-KR');
    },
    
    formatAddress: (address) => {
      if (!address) return '';
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    },
    
    formatDate: (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
    },
    
    delay: (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    getTransactionTypeLabel: (type) => {
      const labels = {
        purchase: '구매',
        sale: '판매',
        bid_won: '낙찰'
      };
      return labels[type] || type;
    }
  };

  // UI 컨트롤러
  const UIController = {
    // 섹션 표시
    showSection: (sectionName) => {
      console.log(`섹션 변경: ${sectionName}`);
      
      // 모든 섹션 숨기기
      document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
      });

      // 네비게이션 업데이트
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionName) {
          item.classList.add('active');
        }
      });

      // 요청된 섹션 표시
      let targetSections = [];
      switch(sectionName) {
        case 'home':
          targetSections = ['homeSection', 'featuresSection'];
          break;
        case 'marketplace':
          targetSections = ['marketplaceSection'];
          ContentRenderer.renderMarketplace();
          break;
        case 'staking':
          targetSections = ['stakingSection'];
          ContentRenderer.renderStaking();
          break;
        case 'dashboard':
          targetSections = ['dashboardSection'];
          ContentRenderer.renderDashboard();
          ContentRenderer.renderAnalyticsChart();
          break;
      }

      targetSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.classList.remove('hidden');
          console.log(`섹션 표시됨: ${sectionId}`);
        }
      });

      AppState.currentSection = sectionName;
    },

    // 모달 표시/숨기기
    showModal: (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('hidden');
        console.log(`모달 표시: ${modalId}`);
      }
    },

    hideModal: (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('hidden');
        console.log(`모달 숨김: ${modalId}`);
      }
    },

    // 토스트 메시지
    showToast: (message, type = 'success') => {
      console.log(`토스트: ${type} - ${message}`);
      
      const toast = document.getElementById('toast');
      const icon = document.getElementById('toastIcon');
      const messageEl = document.getElementById('toastMessage');

      if (!toast || !icon || !messageEl) return;

      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      };

      icon.textContent = icons[type] || icons.success;
      messageEl.textContent = message;
      toast.className = `toast ${type}`;

      setTimeout(() => {
        toast.classList.add('hidden');
      }, 3000);
    },

    // 로딩 스피너
    showLoadingSpinner: () => {
      const spinner = document.getElementById('loadingSpinner');
      if (spinner) spinner.classList.remove('hidden');
    },

    hideLoadingSpinner: () => {
      const spinner = document.getElementById('loadingSpinner');
      if (spinner) spinner.classList.add('hidden');
    }
  };

  // 콘텐츠 렌더링
  const ContentRenderer = {
    // 기능 렌더링
    renderFeatures: () => {
      const container = document.getElementById('featuresGrid');
      if (!container) return;

      container.innerHTML = AppState.features.map(feature => `
        <div class="feature-card">
          <span class="feature-icon">${feature.icon}</span>
          <h3 class="feature-title">${feature.title}</h3>
          <p class="feature-description">${feature.description}</p>
        </div>
      `).join('');

      console.log('기능 목록 렌더링 완료');
    },

    // 마켓플레이스 렌더링
    renderMarketplace: () => {
      const container = document.getElementById('marketplaceGrid');
      if (!container) return;

      let filteredProducts = AppState.products;

      // 검색 필터
      if (AppState.searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
          product.title.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(AppState.searchQuery.toLowerCase()))
        );
      }

      // 카테고리 필터
      if (AppState.selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.category === AppState.selectedCategory
        );
      }

      // 정렬
      filteredProducts = ContentRenderer.sortProducts(filteredProducts, AppState.sortBy);

      container.innerHTML = filteredProducts.map(product => `
        <div class="marketplace-item" data-product-id="${product.id}">
          <div class="item-header">
            <span class="item-emoji">${product.image}</span>
          </div>
          <h3 class="item-title">${product.title}</h3>
          <div class="item-original-price">${Utils.formatPrice(product.originalPrice)}원</div>
          <div class="item-price">${Utils.formatPrice(product.price)}원</div>
          <div class="item-meta">
            <span>${product.seller} • ${product.location}</span>
            <span class="status status--info">${product.condition}</span>
          </div>
          <div class="item-meta">
            <div class="item-deposits">
              <span>⚡ ${product.deposits}명 예치</span>
            </div>
            <span>👀 ${product.views}</span>
          </div>
          <div class="item-tags">
            ${product.tags.slice(0, 3).map(tag => `<span class="item-tag">${tag}</span>`).join('')}
          </div>
        </div>
      `).join('');

      // 상품 클릭 이벤트 추가
      container.querySelectorAll('.marketplace-item').forEach(item => {
        item.addEventListener('click', () => {
          const productId = parseInt(item.dataset.productId);
          Actions.showProductDetail(productId);
        });
      });

      console.log('마켓플레이스 렌더링 완료');
    },

    // 상품 정렬
    sortProducts: (products, sortBy) => {
      switch(sortBy) {
        case 'price_low':
          return products.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        case 'price_high':
          return products.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        case 'popular':
          return products.sort((a, b) => b.views - a.views);
        case 'latest':
        default:
          return products.sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime));
      }
    },

    // 스테이킹 렌더링
    renderStaking: () => {
      const container = document.getElementById('stakingPools');
      if (!container) return;

      container.innerHTML = AppState.stakingPools.map(pool => `
        <div class="staking-pool">
          <div class="pool-header">
            <span class="pool-name">${pool.name}</span>
            <span class="pool-apy">APY ${pool.apy}</span>
          </div>
          <div class="pool-info">
            <div class="pool-info-item">
              <span class="pool-info-label">TVL</span>
              <span class="pool-info-value">${Utils.formatPrice(pool.tvl)}원</span>
            </div>
            <div class="pool-info-item">
              <span class="pool-info-label">내 스테이킹</span>
              <span class="pool-info-value">${Utils.formatPrice(pool.userStaked)} KAIA</span>
            </div>
            <div class="pool-info-item">
              <span class="pool-info-label">보상</span>
              <span class="pool-info-value">${Utils.formatPrice(pool.pendingRewards)} KAIA</span>
            </div>
            <div class="pool-info-item">
              <span class="pool-info-label">잠금 기간</span>
              <span class="pool-info-value">${pool.lockPeriod}</span>
            </div>
          </div>
          <div class="pool-actions">
            <button class="btn btn--primary" data-action="stake" data-pool="${pool.id}">스테이킹</button>
            <button class="btn btn--outline" data-action="unstake" data-pool="${pool.id}">언스테이킹</button>
          </div>
        </div>
      `).join('');

      // 스테이킹 버튼 이벤트 추가
      container.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.dataset.action;
          const poolId = btn.dataset.pool;
          
          if (action === 'stake') {
            Actions.stakeTokens(poolId);
          } else if (action === 'unstake') {
            Actions.unstakeTokens(poolId);
          }
        });
      });

      console.log('스테이킹 풀 렌더링 완료');
    },

    // 대시보드 렌더링
    renderDashboard: () => {
      ContentRenderer.updateDashboardStats();
      ContentRenderer.renderTransactions();
    },

    // 대시보드 통계 업데이트
    updateDashboardStats: () => {
      const userBalance = document.getElementById('userBalance');
      const activeTransactions = document.getElementById('activeTransactions');
      const completedTransactions = document.getElementById('completedTransactions');

      if (userBalance) userBalance.textContent = `${Utils.formatPrice(AppState.user.balance)} KRW`;
      
      const activeTxs = AppState.transactions.filter(tx => tx.status === 'in_progress').length;
      const completedTxs = AppState.transactions.filter(tx => tx.status === 'completed').length;
      
      if (activeTransactions) activeTransactions.textContent = activeTxs;
      if (completedTransactions) completedTransactions.textContent = completedTxs;

      console.log('대시보드 통계 업데이트 완료');
    },

    // 거래 내역 렌더링
    renderTransactions: () => {
      const container = document.getElementById('transactionsList');
      if (!container) return;

      let filteredTransactions = AppState.transactions;
      if (AppState.transactionFilter !== 'all') {
        filteredTransactions = AppState.transactions.filter(tx => tx.type === AppState.transactionFilter);
      }

      container.innerHTML = filteredTransactions.map(tx => `
        <div class="transaction-item">
          <div class="transaction-header">
            <span class="transaction-type ${tx.type}">
              ${Utils.getTransactionTypeLabel(tx.type)}
            </span>
            <span class="transaction-status">${Utils.formatDate(tx.date)}</span>
          </div>
          <div class="transaction-item-name">${tx.item}</div>
          <div class="transaction-amount">${Utils.formatPrice(tx.amount)}원</div>
        </div>
      `).join('');

      console.log('거래 내역 렌더링 완료');
    },

    // 분석 차트 렌더링
    renderAnalyticsChart: () => {
      const canvas = document.getElementById('analyticsChart');
      if (!canvas || AppState.analyticsChart) return;

      const ctx = canvas.getContext('2d');

      AppState.analyticsChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: AppState.analyticsData.map(d => Utils.formatDate(d.date)),
          datasets: [{
            label: '거래량 (원)',
            data: AppState.analyticsData.map(d => d.volume),
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            tension: 0.4,
            fill: true
          }, {
            label: '거래 수',
            data: AppState.analyticsData.map(d => d.trades),
            borderColor: '#FFC185',
            backgroundColor: 'rgba(255, 193, 133, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y1'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: '일별 거래 현황'
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
            }
          }
        }
      });

      console.log('분석 차트 렌더링 완료');
    }
  };

  // 액션 핸들러
  const Actions = {
    // 지갑 연결
    connectWallet: async (walletType) => {
      console.log(`지갑 연결 시도: ${walletType}`);
      UIController.showToast('지갑 연결 중...', 'info');
      UIController.showLoadingSpinner();
      
      await Utils.delay(2000);
      
      AppState.isWalletConnected = true;
      AppState.connectedWallet = walletType;
      AppState.userAddress = "0x1234567890abcdef1234567890abcdef12345678";
      AppState.user.isConnected = true;
      AppState.user.walletType = walletType;
      AppState.user.address = AppState.userAddress;

      Actions.updateWalletUI();
      UIController.hideModal('walletModal');
      UIController.hideLoadingSpinner();
      UIController.showToast(`${walletType} 지갑이 성공적으로 연결되었습니다!`, 'success');
    },

    // 지갑 연결 해제
    disconnectWallet: () => {
      console.log('지갑 연결 해제');
      AppState.isWalletConnected = false;
      AppState.connectedWallet = null;
      AppState.userAddress = null;
      AppState.user.isConnected = false;

      Actions.updateWalletUI();
      UIController.showToast('지갑 연결이 해제되었습니다.', 'info');
    },

    // 지갑 UI 업데이트
    updateWalletUI: () => {
      const connectBtn = document.getElementById('connectWalletBtn');
      const disconnectBtn = document.getElementById('disconnectWalletBtn');
      const walletInfo = document.getElementById('walletInfo');

      if (AppState.isWalletConnected) {
        connectBtn?.classList.add('hidden');
        disconnectBtn?.classList.remove('hidden');
        walletInfo?.classList.remove('hidden');
        
        const addressEl = walletInfo?.querySelector('.wallet-address');
        const balanceEl = walletInfo?.querySelector('.wallet-balance');
        
        if (addressEl) addressEl.textContent = Utils.formatAddress(AppState.userAddress);
        if (balanceEl) balanceEl.textContent = `${AppState.user.kaiaBalance} KAIA`;
      } else {
        connectBtn?.classList.remove('hidden');
        disconnectBtn?.classList.add('hidden');
        walletInfo?.classList.add('hidden');
      }
    },

    // 상품 상세보기
    showProductDetail: (productId) => {
      const product = AppState.products.find(p => p.id === productId);
      if (!product) return;

      console.log(`상품 상세보기: ${product.title}`);
      AppState.selectedProduct = product;
      
      const modalContent = document.getElementById('productModalContent');
      modalContent.innerHTML = `
        <div class="product-modal-content">
          <div class="product-modal-header">
            <span class="product-detail-emoji">${product.image}</span>
            <h2 class="product-detail-title">${product.title}</h2>
            <div class="product-detail-original-price">${Utils.formatPrice(product.originalPrice)}원</div>
            <div class="product-detail-price">${Utils.formatPrice(product.price)}원</div>
          </div>

          <div class="product-info-grid">
            <div class="product-info-section">
              <h4 class="product-info-title">상품 정보</h4>
              <div class="info-row">
                <span class="info-label">판매자</span>
                <span class="info-value">${product.seller} ⭐ ${product.sellerRating}</span>
              </div>
              <div class="info-row">
                <span class="info-label">위치</span>
                <span class="info-value">${product.location}</span>
              </div>
              <div class="info-row">
                <span class="info-label">상품상태</span>
                <span class="info-value">${product.condition}</span>
              </div>
              <div class="info-row">
                <span class="info-label">카테고리</span>
                <span class="info-value">${product.category}</span>
              </div>
              <div class="info-row">
                <span class="info-label">배송비</span>
                <span class="info-value">${product.deliveryFee === '무료' ? '무료' : product.deliveryFee + '원'}</span>
              </div>
            </div>

            <div class="product-info-section">
              <h4 class="product-info-title">상품 설명</h4>
              <p>${product.description}</p>
            </div>

            <div class="deposit-section">
              <div class="deposit-stats">
                <div class="deposit-count">${product.deposits}명이 예치금을 납부했습니다</div>
                <div class="deposit-amount">총 예치금: ${Utils.formatPrice(product.totalDeposited)}원</div>
                <div class="deposit-amount">현재 최고 입찰: ${Utils.formatPrice(product.highestBid)}원</div>
              </div>
              <button class="btn btn--primary btn--full-width" id="startEscrowBtn">
                ${Utils.formatPrice(product.price)}원 예치하고 구매하기
              </button>
            </div>
          </div>
        </div>
      `;

      // 에스크로 시작 버튼 이벤트 추가
      const startBtn = document.getElementById('startEscrowBtn');
      if (startBtn) {
        startBtn.addEventListener('click', Actions.startEscrow);
      }

      UIController.showModal('productModal');
    },

    // 에스크로 시작
    startEscrow: () => {
      console.log('에스크로 거래 시작');
      
      if (!AppState.isWalletConnected) {
        UIController.hideModal('productModal');
        UIController.showModal('walletModal');
        UIController.showToast('먼저 지갑을 연결해주세요.', 'warning');
        return;
      }

      if (!AppState.selectedProduct) return;

      const transactionDetails = document.getElementById('transactionDetails');
      const gasFee = 2500;
      const total = parseInt(AppState.selectedProduct.price) + gasFee;

      transactionDetails.innerHTML = `
        <div class="transaction-detail-item">
          <span class="transaction-detail-label">상품명</span>
          <span class="transaction-detail-value">${AppState.selectedProduct.title}</span>
        </div>
        <div class="transaction-detail-item">
          <span class="transaction-detail-label">예치금</span>
          <span class="transaction-detail-value">${Utils.formatPrice(AppState.selectedProduct.price)}원</span>
        </div>
        <div class="transaction-detail-item">
          <span class="transaction-detail-label">가스비</span>
          <span class="transaction-detail-value">~${Utils.formatPrice(gasFee)}원</span>
        </div>
        <div class="transaction-detail-item">
          <span class="transaction-detail-label">총 금액</span>
          <span class="transaction-detail-value">${Utils.formatPrice(total)}원</span>
        </div>
      `;

      UIController.hideModal('productModal');
      UIController.showModal('transactionModal');
    },

    // 거래 확인
    confirmTransaction: async () => {
      console.log('거래 확인 시작');
      UIController.hideModal('transactionModal');
      UIController.showModal('depositProgressModal');
      
      const steps = ['step1', 'step2', 'step3', 'step4'];
      const messages = [
        '지갑에서 거래를 승인해주세요...',
        '블록체인에 거래를 전송 중...',
        '네트워크에서 거래를 확인 중...',
        '거래가 성공적으로 완료되었습니다!'
      ];

      const progressMessage = document.getElementById('progressMessage');

      for (let i = 0; i < steps.length; i++) {
        await Utils.delay(2000);
        
        // 이전 단계 완료 처리
        if (i > 0) {
          const prevStep = document.getElementById(steps[i-1]);
          if (prevStep) {
            prevStep.classList.remove('active');
            prevStep.classList.add('completed');
          }
        }
        
        // 현재 단계 활성화
        const currentStep = document.getElementById(steps[i]);
        if (currentStep) {
          currentStep.classList.add('active');
        }
        
        if (progressMessage) {
          progressMessage.textContent = messages[i];
        }
      }

      // 완료 후 처리
      await Utils.delay(1000);
      UIController.hideModal('depositProgressModal');
      UIController.showToast('예치금이 성공적으로 납부되었습니다!', 'success');
      
      // 거래 내역 추가
      AppState.transactions.unshift({
        id: `tx_${Date.now()}`,
        type: 'purchase',
        item: AppState.selectedProduct.title,
        amount: AppState.selectedProduct.price,
        status: 'in_progress',
        date: new Date().toISOString(),
        seller: AppState.selectedProduct.seller
      });
    },

    // 스테이킹 관련
    stakeTokens: async (poolId) => {
      if (!AppState.isWalletConnected) {
        UIController.showToast('지갑을 먼저 연결해주세요.', 'warning');
        return;
      }
      
      console.log(`스테이킹: ${poolId}`);
      UIController.showToast('스테이킹 진행 중...', 'info');
      await Utils.delay(2000);
      UIController.showToast('스테이킹이 완료되었습니다!', 'success');
    },

    unstakeTokens: async (poolId) => {
      if (!AppState.isWalletConnected) {
        UIController.showToast('지갑을 먼저 연결해주세요.', 'warning');
        return;
      }
      
      console.log(`언스테이킹: ${poolId}`);
      UIController.showToast('언스테이킹 진행 중...', 'info');
      await Utils.delay(2000);
      UIController.showToast('언스테이킹이 완료되었습니다!', 'success');
    },

    claimRewards: async () => {
      if (!AppState.isWalletConnected) {
        UIController.showToast('지갑을 먼저 연결해주세요.', 'warning');
        return;
      }
      
      console.log('보상 청구');
      UIController.showToast('보상 청구 중...', 'info');
      await Utils.delay(2000);
      UIController.showToast('보상이 성공적으로 청구되었습니다!', 'success');
    }
  };

  // 이벤트 리스너 설정
  function setupEventListeners() {
    console.log('이벤트 리스너 설정 시작');

    // 1. 네비게이션
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        console.log(`네비게이션 클릭: ${section}`);
        UIController.showSection(section);
      });
    });

    // 2. 지갑 연결 버튼들
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    if (connectWalletBtn) {
      connectWalletBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('지갑 연결 버튼 클릭');
        UIController.showModal('walletModal');
      });
    }

    const connectKaikas = document.getElementById('connectKaikas');
    if (connectKaikas) {
      connectKaikas.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.connectWallet('Kaikas');
      });
    }

    const connectMetamask = document.getElementById('connectMetamask');
    if (connectMetamask) {
      connectMetamask.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.connectWallet('MetaMask');
      });
    }

    const disconnectBtn = document.getElementById('disconnectWalletBtn');
    if (disconnectBtn) {
      disconnectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.disconnectWallet();
      });
    }

    // 3. 모달 닫기
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = e.target.closest('.modal');
        if (modal) {
          UIController.hideModal(modal.id);
        }
      });
    });

    // 4. 모달 외부 클릭
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          UIController.hideModal(modal.id);
        }
      });
    });

    // 5. 시작하기 버튼
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
      getStartedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (AppState.isWalletConnected) {
          UIController.showSection('marketplace');
        } else {
          UIController.showModal('walletModal');
        }
      });
    }

    // 6. 검색 및 필터
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        AppState.searchQuery = e.target.value;
        ContentRenderer.renderMarketplace();
      });
    }

    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        AppState.selectedCategory = e.target.value;
        ContentRenderer.renderMarketplace();
      });
    }

    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
      sortFilter.addEventListener('change', (e) => {
        AppState.sortBy = e.target.value;
        ContentRenderer.renderMarketplace();
      });
    }

    // 7. 거래 확인 버튼
    const confirmTransactionBtn = document.getElementById('confirmTransactionBtn');
    if (confirmTransactionBtn) {
      confirmTransactionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.confirmTransaction();
      });
    }

    // 8. 거래 필터 버튼들
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        AppState.transactionFilter = btn.dataset.filter;
        ContentRenderer.renderTransactions();
      });
    });

    // 9. 보상 청구 버튼
    const claimAllRewards = document.getElementById('claimAllRewards');
    if (claimAllRewards) {
      claimAllRewards.addEventListener('click', (e) => {
        e.preventDefault();
        Actions.claimRewards();
      });
    }

    console.log('이벤트 리스너 설정 완료');
  }

  // 초기화 함수
  function initialize() {
    console.log('매듭 앱 초기화');
    
    // 초기 콘텐츠 렌더링
    ContentRenderer.renderFeatures();
    ContentRenderer.renderMarketplace();
    
    // 통계 업데이트
    const tvlValue = document.getElementById('tvlValue');
    const activeEscrows = document.getElementById('activeEscrows');
    const todayCompleted = document.getElementById('todayCompleted');
    
    if (tvlValue) tvlValue.textContent = '156.8억 원';
    if (activeEscrows) activeEscrows.textContent = '127';
    if (todayCompleted) todayCompleted.textContent = '43';
    
    console.log('초기화 완료');
  }

  // 앱 시작
  setupEventListeners();
  initialize();
  
  console.log('매듭 앱 로드 완료 ✅');
});