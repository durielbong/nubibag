// ============================================================
// ADMIN / 商品登録機能
// 画面上の「＋ 商品登録」ボタンから、新しい商品（必要なら新しい
// カテゴリーも）を登録できる。データは localStorage に保存され、
// 次回アクセス時にも保持される（サーバー不要）。
// ============================================================

const NEW_CATEGORY_VALUE = '__new__';

function openAdminModal() {
    populateAdminCategoryOptions();
    document.getElementById('admin-form').reset();
    toggleNewCategoryFields();
    document.getElementById('admin-modal').classList.remove('hidden');
}

function closeAdminModal() {
    document.getElementById('admin-modal').classList.add('hidden');
}

// カテゴリー選択リストを最新の categories 配列から作成
function populateAdminCategoryOptions() {
    const select = document.getElementById('admin-category-select');
    if (!select) return;

    select.innerHTML = '';

    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = cat.title;
        select.appendChild(opt);
    });

    const newOpt = document.createElement('option');
    newOpt.value = NEW_CATEGORY_VALUE;
    newOpt.textContent = '＋ 新しいカテゴリーを追加';
    select.appendChild(newOpt);
}

// 「新しいカテゴリーを追加」を選んだ時だけ、カテゴリー情報入力欄を表示
function toggleNewCategoryFields() {
    const select = document.getElementById('admin-category-select');
    const newCategoryBlock = document.getElementById('admin-new-category-fields');
    if (!select || !newCategoryBlock) return;

    if (select.value === NEW_CATEGORY_VALUE) {
        newCategoryBlock.classList.remove('hidden');
    } else {
        newCategoryBlock.classList.add('hidden');
    }
}

// カテゴリー名からIDを自動生成 (例: "Freeサイズのバッグ" -> "cat-custom-xxxx")
function slugifyCategoryId(title) {
    return 'cat-custom-' + Date.now().toString(36);
}

function handleAdminFormSubmit(event) {
    event.preventDefault();

    const categorySelect = document.getElementById('admin-category-select');
    let categoryId = categorySelect.value;

    // 1) 必要であれば新規カテゴリーを作成
    if (categoryId === NEW_CATEGORY_VALUE) {
        const newTitle = document.getElementById('admin-new-category-title').value.trim();
        if (!newTitle) {
            showToast('新しいカテゴリー名を入力してください');
            return;
        }

        const newCategory = {
            id: slugifyCategoryId(newTitle),
            title: newTitle,
            subTitle: document.getElementById('admin-new-category-subtitle').value.trim(),
            desc: document.getElementById('admin-new-category-desc').value.trim() || newTitle,
            tag: 'Handmade in Busan',
            mainImg: document.getElementById('admin-product-img').value.trim() ||
                'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
        };

        const customCategories = loadCustomCategories();
        customCategories.push(newCategory);
        saveCustomCategories(customCategories);

        categoryId = newCategory.id;
    }

    // 2) 入力値の取得・簡易バリデーション
    const title = document.getElementById('admin-product-title').value.trim();
    const color = document.getElementById('admin-product-color').value.trim();
    const priceJpy = Number(document.getElementById('admin-product-price-jpy').value);
    const priceKrw = Number(document.getElementById('admin-product-price-krw').value);
    const desc = document.getElementById('admin-product-desc').value.trim();
    const size = document.getElementById('admin-product-size').value.trim();
    const img = document.getElementById('admin-product-img').value.trim();

    if (!title || !color || !img || !priceJpy || !desc || !size) {
        showToast('必須項目（＊）をすべて入力してください');
        return;
    }

    const newProduct = {
        id: 'custom-' + Date.now().toString(36),
        categoryId: categoryId,
        title: title,
        color: color,
        priceJpy: priceJpy,
        priceKrw: priceKrw || 0,
        desc: desc,
        size: size,
        img: img
    };

    // 3) 保存
    const customProducts = loadCustomProducts();
    customProducts.push(newProduct);
    saveCustomProducts(customProducts);

    // 4) 画面再描画
    buildCategories();
    renderCategories();
    populateAdminCategoryOptions();
    if (activeCategory && activeCategory.id === categoryId) {
        activeCategory = categories.find(c => c.id === categoryId);
        renderCategoryItems();
    }

    closeAdminModal();
    showToast('商品を登録しました ✓');
}

// 登録した商品・カテゴリーをすべて削除して初期状態に戻す
function resetCustomProducts() {
    if (!confirm('登録したカテゴリー・商品をすべて削除します。よろしいですか？')) return;
    localStorage.removeItem(STORAGE_KEYS.categories);
    localStorage.removeItem(STORAGE_KEYS.products);
    buildCategories();
    renderCategories();
    populateAdminCategoryOptions();
    if (activeCategory) {
        activeCategory = categories.find(c => c.id === activeCategory.id) || null;
        if (activeCategory) {
            renderCategoryItems();
        } else {
            showView('home');
        }
    }
    showToast('登録データをリセットしました');
}

// 簡易トースト通知
let toastTimer = null;
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2400);
}
