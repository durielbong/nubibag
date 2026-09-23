// ============================================================
// APP LOGIC
// 画面描画・ビュー切り替え・モーダル制御
// ============================================================

let activeCategory = null;
let activeColorFilter = 'all';

window.onload = function () {
    buildCategories();     // data.js: 基本データ + 登録データを統合
    renderCategories();
    if (typeof populateAdminCategoryOptions === 'function') {
        populateAdminCategoryOptions(); // admin.js: 登録フォームのカテゴリー選択肢を作成
    }
};

// ------------------------------------------------------------
// Render Homepage Category Cards
// ------------------------------------------------------------
function renderCategories() {
    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';

    if (categories.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-400 text-xs">
                現在カテゴリーがありません。
            </div>
        `;
        return;
    }

    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm card-hover cursor-pointer flex flex-col justify-between';
        card.onclick = () => selectCategory(cat.id);

        card.innerHTML = `
            <div>
                <div class="h-60 sm:h-64 overflow-hidden bg-gray-100 relative">
                    <img src="${cat.mainImg}" alt="${cat.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                </div>
                <div class="p-5">
                    <h3 class="text-base sm:text-lg font-bold text-gray-900">${cat.title}</h3>
                    <p class="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-3">${cat.desc}</p>
                </div>
            </div>
            <div class="px-5 pb-5 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span class="text-[11px] text-gray-400 font-medium">${cat.tag}</span>
                <span class="text-xs text-brand-600 font-bold flex items-center">
                    詳細を見る <i class="fa-solid fa-chevron-right text-[10px] ml-1"></i>
                </span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ------------------------------------------------------------
// Navigate to Specific Category Detail View
// ------------------------------------------------------------
function selectCategory(catId) {
    activeCategory = categories.find(c => c.id === catId);
    if (!activeCategory) return;

    activeColorFilter = 'all';
    document.getElementById('breadcrumb-category').innerText = activeCategory.title;
    document.getElementById('category-detail-title').innerText = activeCategory.title;
    document.getElementById('category-detail-desc').innerText = activeCategory.desc;

    // Reset Filter Buttons
    document.querySelectorAll('.color-filter-btn').forEach(btn => {
        if (btn.dataset.color === 'all') {
            btn.className = 'color-filter-btn px-3 py-1.5 rounded-full bg-brand-800 text-white font-medium';
        } else {
            btn.className = 'color-filter-btn px-3 py-1.5 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50';
        }
    });

    renderCategoryItems();
    showView('category-detail');
}

// ------------------------------------------------------------
// Render List of Products inside selected Category
// ------------------------------------------------------------
function renderCategoryItems() {
    if (!activeCategory) return;

    const grid = document.getElementById('product-items-grid');
    grid.innerHTML = '';

    const filteredItems = activeColorFilter === 'all'
        ? activeCategory.items
        : activeCategory.items.filter(item => item.color === activeColorFilter);

    document.getElementById('item-count').innerText = filteredItems.length;

    if (filteredItems.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-400 text-xs">
                該当する商品がありません。
            </div>
        `;
        return;
    }

    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm card-hover cursor-pointer flex flex-col justify-between';
        card.onclick = () => openProductModal(item);

        card.innerHTML = `
            <div>
                <div class="h-48 overflow-hidden bg-gray-100 relative">
                    <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover">
                    <span class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-md text-gray-700 shadow-sm">
                        ${item.color}
                    </span>
                </div>
                <div class="p-4">
                    <h4 class="text-sm font-bold text-gray-900">${item.title}</h4>
                    <p class="text-xs text-gray-500 mt-1 line-clamp-2">${item.desc}</p>
                </div>
            </div>
            <div class="p-4 pt-0">
                <div class="flex items-baseline justify-between mt-2 pt-3 border-t border-gray-100">
                    <div>
                        <span class="text-base font-bold text-brand-800">￥${Number(item.priceJpy).toLocaleString()}</span>
                        <span class="text-[10px] text-gray-400 block">(${Number(item.priceKrw).toLocaleString()} KRW)</span>
                    </div>
                    <span class="text-[11px] bg-brand-50 text-brand-800 px-2 py-1 rounded font-medium">詳細</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ------------------------------------------------------------
// Color Filter Handler
// ------------------------------------------------------------
function filterColor(color) {
    activeColorFilter = color;
    document.querySelectorAll('.color-filter-btn').forEach(btn => {
        if (btn.dataset.color === color) {
            btn.className = 'color-filter-btn px-3 py-1.5 rounded-full bg-brand-800 text-white font-medium';
        } else {
            btn.className = 'color-filter-btn px-3 py-1.5 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50';
        }
    });
    renderCategoryItems();
}

// ------------------------------------------------------------
// Show View Switcher
// ------------------------------------------------------------
function showView(viewName) {
    const homeView = document.getElementById('view-home');
    const heroBanner = document.getElementById('hero-banner');
    const categoryDetailView = document.getElementById('view-category-detail');

    if (viewName === 'home') {
        homeView.classList.remove('hidden');
        heroBanner.classList.remove('hidden');
        categoryDetailView.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'category-detail') {
        homeView.classList.add('hidden');
        heroBanner.classList.add('hidden');
        categoryDetailView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function scrollToProducts() {
    showView('home');
    document.getElementById('category-grid').scrollIntoView({ behavior: 'smooth' });
}

// ------------------------------------------------------------
// Product Detail Modal
// ------------------------------------------------------------
function openProductModal(item) {
    document.getElementById('modal-product-image').src = item.img;
    document.getElementById('modal-product-category').innerText = activeCategory ? activeCategory.title : 'NUBI BAG';
    document.getElementById('modal-product-title').innerText = item.title;
    document.getElementById('modal-product-price-jpy').innerText = `￥${Number(item.priceJpy).toLocaleString()}`;
    document.getElementById('modal-product-price-krw').innerText = `(${Number(item.priceKrw).toLocaleString()} KRW)`;
    document.getElementById('modal-product-desc').innerText = item.desc;
    document.getElementById('modal-product-size').innerText = item.size;

    document.getElementById('product-modal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

// ------------------------------------------------------------
// Store Info Modal
// ------------------------------------------------------------
function openStoreModal() {
    document.getElementById('store-modal').classList.remove('hidden');
}

function closeStoreModal() {
    document.getElementById('store-modal').classList.add('hidden');
}
