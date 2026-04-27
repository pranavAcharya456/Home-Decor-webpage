function showPage(name) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });

  var target = document.getElementById('page-' + name);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.classList.remove('active');
    if (a.getAttribute('data-page') === name) {
      a.classList.add('active');
    }
  });

  window.scrollTo(0, 0);

  if (name === 'categories') {
    filterProducts();
  }
}

var products = [
  { name: "Terracotta Ceramic Vase",    cat: "living",  catLabel: "Living Room",  material: "Ceramic",        img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&auto=format&fit=crop", price: 1299 },
  { name: "Rattan Hanging Planter",     cat: "plants",  catLabel: "Plants & Pots",material: "Rattan",         img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop", price: 2150 },
  { name: "Arch Gold Wall Mirror",      cat: "wall",    catLabel: "Wall Décor",   material: "Metal & Glass",  img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop", price: 3499 },
  { name: "Embroidered Cushion Set",    cat: "bedroom", catLabel: "Bedroom",      material: "Cotton",         img: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400&auto=format&fit=crop", price: 899  },
  { name: "Wooden Arch Bookend Pair",   cat: "living",  catLabel: "Living Room",  material: "Mango Wood",     img: "https://images.unsplash.com/photo-1589642380614-4a8c2776b197?w=400&auto=format&fit=crop", price: 1750 },
  { name: "Artisan Pillar Candle Set",  cat: "lighting",catLabel: "Lighting",     material: "Beeswax",        img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop", price: 749  },
  { name: "Seagrass Woven Tray",        cat: "dining",  catLabel: "Dining",       material: "Seagrass",       img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop", price: 1180 },
  { name: "Macramé Wall Hanging",       cat: "wall",    catLabel: "Wall Décor",   material: "Cotton Rope",    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop", price: 2200 },
  { name: "Marble Effect Table Lamp",   cat: "lighting",catLabel: "Lighting",     material: "Ceramic & Metal",img: "https://images.unsplash.com/photo-1513506003901-1e6a35405f7b?w=400&auto=format&fit=crop", price: 4350 },
  { name: "Hand-painted Ceramic Bowl",  cat: "dining",  catLabel: "Dining",       material: "Ceramic",        img: "https://images.unsplash.com/photo-1563292769-4e05b684851a?w=400&auto=format&fit=crop", price: 950  },
  { name: "Jute Printed Area Rug",      cat: "living",  catLabel: "Living Room",  material: "Jute & Cotton",  img: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=400&auto=format&fit=crop", price: 3700 },
  { name: "Linen Bed Runner",           cat: "bedroom", catLabel: "Bedroom",      material: "Linen",          img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&auto=format&fit=crop", price: 1450 },
  { name: "Copper Finish Votive Set",   cat: "lighting",catLabel: "Lighting",     material: "Metal",          img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop", price: 680  },
  { name: "Bamboo Photo Frame Set",     cat: "wall",    catLabel: "Wall Décor",   material: "Bamboo",         img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&auto=format&fit=crop", price: 1620 },
  { name: "Terracotta Pot with Saucer", cat: "plants",  catLabel: "Plants & Pots",material: "Clay",           img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop", price: 420  },
  { name: "Woven Storage Basket",       cat: "living",  catLabel: "Living Room",  material: "Seagrass",       img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&auto=format&fit=crop", price: 1880 },
  { name: "Velvet Throw Blanket",       cat: "bedroom", catLabel: "Bedroom",      material: "Velvet",         img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop", price: 2490 },
  { name: "Hexagonal Wall Shelves Set", cat: "wall",    catLabel: "Wall Décor",   material: "MDF & Metal",    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop", price: 2850 }
];

var currentFilter = 'all';

function renderProducts(list) {
  var grid = document.getElementById('prodGrid');
  var noRes = document.getElementById('noResults');
  var countEl = document.getElementById('countNum');

  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    countEl.textContent = '0';
    return;
  }

  noRes.style.display = 'none';
  countEl.textContent = list.length;

  grid.innerHTML = list.map(function(p) {
    return '<div class="prod-card">' +
      '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
      '<div class="pi">' +
        '<p class="pcat">' + p.catLabel + '</p>' +
        '<p class="pname">' + p.name + '</p>' +
        '<p class="pprice">Rs.' + p.price.toLocaleString('en-IN') + '</p>' +
        '<p class="pmaterial">Material: ' + p.material + '</p>' +
      '</div>' +
    '</div>';
  }).join('');
}

function filterProducts() {
  var input = document.getElementById('searchInput');
  var q = input ? input.value.toLowerCase() : '';

  var filtered = products.filter(function(p) {
    var matchCat = currentFilter === 'all' || p.cat === currentFilter;
    var matchSearch = p.name.toLowerCase().indexOf(q) !== -1 ||
                      p.catLabel.toLowerCase().indexOf(q) !== -1 ||
                      p.material.toLowerCase().indexOf(q) !== -1;
    return matchCat && matchSearch;
  });

  renderProducts(filtered);
}

function setFilter(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  filterProducts();
}

function showProfilePanel(name, link) {
  document.querySelectorAll('.panel').forEach(function(p) {
    p.classList.remove('active');
  });
  document.querySelectorAll('.sidebar-nav a').forEach(function(a) {
    a.classList.remove('active');
  });

  var panel = document.getElementById('panel-' + name);
  if (panel) panel.classList.add('active');
  if (link) link.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
  renderProducts(products);
});
