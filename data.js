// ============================================================
// DATA LAYER
// 商品カテゴリー & 商品データ、および「商品登録」機能で追加された
// データ（ブラウザの localStorage に保存）の読み込み・統合を行う。
// ============================================================

// 元々サイトに組み込まれている基本カテゴリー（編集しても構いませんが、
// 通常は画面右上の「商品登録」ボタンから追加してください）
const BASE_CATEGORIES = [
    {
        id: 'cat-s',
        title: 'Sサイズのヌビバック',
        subTitle: 'Nubi Tote Bag (S)',
        desc: '軽くてふんわりとした肌触りの、デイリーに活躍するヌビトートバッグです。',
        tag: 'Handmade in Busan',
        mainImg: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
        items: [
            {
                id: 's-1',
                title: 'Sサイズ ヌビトート (アイボリー)',
                color: 'アイボリー',
                priceJpy: 3200,
                priceKrw: 28000,
                desc: 'ふんわり優しい肌触りのアイボリーカラー。ちょっとしたお出かけやランチバッグに最適です。',
                size: 'W28cm x H20cm x D10cm',
                img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: 's-2',
                title: 'Sサイズ ヌビトート (サクラピンク)',
                color: 'ピンク',
                priceJpy: 3200,
                priceKrw: 28000,
                desc: '華やかで可愛らしいサクラピンク。コーデのアクセントになる人気カラーです。',
                size: 'W28cm x H20cm x D10cm',
                img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: 's-3',
                title: 'Sサイズ ヌビトート (ナチュラルベージュ)',
                color: 'ベージュ',
                priceJpy: 3200,
                priceKrw: 28000,
                desc: '落ち着きのある優しいベージュ。どんな服装にも合わせやすい万能カラー。',
                size: 'W28cm x H20cm x D10cm',
                img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: 's-4',
                title: 'Sサイズ ヌビトート (チャコールグレー)',
                color: 'チャコール',
                priceJpy: 3400,
                priceKrw: 30000,
                desc: 'シックで汚れが目立ちにくいチャコールカラー。男性にも人気のモダンな色合いです。',
                size: 'W28cm x H20cm x D10cm',
                img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
            }
        ]
    },
    {
        id: 'cat-m',
        title: 'Mサイズのヌビバック',
        subTitle: 'Nubi Shoulder Bag (M)',
        desc: '優れた収納力とセンスあふれる刺繍デザイン。使い勝手抜群のショルダーバッグ。',
        tag: 'Handmade in Busan',
        mainImg: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
        items: [
            {
                id: 'm-1',
                title: 'Mサイズ ヌビショルダー (モカベージュ)',
                color: 'ベージュ',
                priceJpy: 4500,
                priceKrw: 39000,
                desc: 'A4サイズやペットボトルも楽々入るミディアムサイズ。肩掛けがしやすく通勤や散策に便利。',
                size: 'W36cm x H26cm x D12cm',
                img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: 'm-2',
                title: 'Mサイズ ヌビショルダー (アイボリー刺繍)',
                color: 'アイボリー',
                priceJpy: 4800,
                priceKrw: 42000,
                desc: '上品なお花のワンポイント刺繍が入った人気のモデル。ワンランク上の上品さ。',
                size: 'W36cm x H26cm x D12cm',
                img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: 'm-3',
                title: 'Mサイズ ヌビショルダー (ダスティピンク)',
                color: 'ピンク',
                priceJpy: 4500,
                priceKrw: 39000,
                desc: 'くすみ系の落ち着いたピンク。大人可愛いスタイリングにぴったりです。',
                size: 'W36cm x H26cm x D12cm',
                img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'
            }
        ]
    },
    {
        id: 'cat-l',
        title: 'Lサイズのヌビバック',
        subTitle: 'Nubi Big Tote Bag (L)',
        desc: '旅行や日常使いにも大活躍。コスメから小物までたっぷり収まる、安心感のあるビッグサイズヌビバッグ。',
        tag: 'Handmade in Busan',
        mainImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
        items: [
            {
                id: 'l-1',
                title: 'Lサイズ ヌビビッグトート (チャコール)',
                color: 'チャコール',
                priceJpy: 5800,
                priceKrw: 52000,
                desc: '1泊2日の旅行やマザーズバッグとしても大人気の大容量サイズ。洗濯機で丸洗い可能です。',
                size: 'W45cm x H32cm x D15cm',
                img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: 'l-2',
                title: 'Lサイズ ヌビビッグトート (ナチュラルアイボリー)',
                color: 'アイボリー',
                priceJpy: 5800,
                priceKrw: 52000,
                desc: '清潔感のあるアイボリーの大容量トート。軽いため荷物が多くなっても疲れにくいのが魅力。',
                size: 'W45cm x H32cm x D15cm',
                img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
            }
        ]
    },
    {
        id: 'cat-pouch',
        title: 'ヌビ生地のポーチ & コスメ',
        subTitle: 'Nubi Pouch & Beauty Items',
        desc: 'ふんわり優しいヌビ素材。コスメや小物を綺麗にまとめて持ち運べるポーチ＆人気韓国コスメ。',
        tag: 'Handmade in Busan',
        mainImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
        items: [
            {
                id: 'p-1',
                title: 'ヌビ マルチポーチ (ストライプ刺繍)',
                color: 'アイボリー',
                priceJpy: 1600,
                priceKrw: 14000,
                desc: 'リップやコンパクト、イヤホンなどの小物を収納するのにピッタリなふんわりポーチ。',
                size: 'W18cm x H12cm x D6cm',
                img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: 'p-2',
                title: 'ヌビ バニティ型 コスメポーチ',
                color: 'ピンク',
                priceJpy: 2400,
                priceKrw: 21000,
                desc: 'ガバッと大きく開くので出し入れがラクラク。旅行用の化粧品ポーチとして大人気です。',
                size: 'W20cm x H14cm x D10cm',
                img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
            },
            {
                id: 'p-3',
                title: '釜山限定 スキンケア コスメセット',
                color: 'ベージュ',
                priceJpy: 3500,
                priceKrw: 30000,
                desc: '当店限定！保湿力の高い韓国人気ハンドクリームとシートマスクの特別ギフトセット。',
                size: 'Gift Box Package',
                img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800'
            }
        ]
    }
];

// ------------------------------------------------------------
// localStorage keys used to persist admin-registered data
// ------------------------------------------------------------
const STORAGE_KEYS = {
    categories: 'busanNubi_customCategories',
    products: 'busanNubi_customProducts'
};

function loadCustomCategories() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.categories)) || [];
    } catch (e) {
        console.error('カスタムカテゴリーの読み込みに失敗しました', e);
        return [];
    }
}

function saveCustomCategories(list) {
    try {
        localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(list));
    } catch (e) {
        console.error('カスタムカテゴリーの保存に失敗しました', e);
    }
}

function loadCustomProducts() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.products)) || [];
    } catch (e) {
        console.error('カスタム商品の読み込みに失敗しました', e);
        return [];
    }
}

function saveCustomProducts(list) {
    try {
        localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(list));
    } catch (e) {
        console.error('カスタム商品の保存に失敗しました', e);
    }
}

// 画面表示に実際に使われるカテゴリー配列（基本データ + 登録データを統合）
let categories = [];

// 基本カテゴリーと、localStorage に保存された「商品登録」データを統合して
// categories 配列を再構築する。商品を追加/削除するたびに呼び出す。
function buildCategories() {
    const customCategories = loadCustomCategories();
    const customProducts = loadCustomProducts();

    // 元データを直接書き換えないようにコピーする
    const merged = BASE_CATEGORIES.map(cat => ({
        ...cat,
        items: [...cat.items]
    }));

    customCategories.forEach(cat => {
        merged.push({ ...cat, items: [] });
    });

    customProducts.forEach(product => {
        const target = merged.find(c => c.id === product.categoryId);
        if (target) {
            target.items.push(product);
        }
    });

    categories = merged;
    return categories;
}
