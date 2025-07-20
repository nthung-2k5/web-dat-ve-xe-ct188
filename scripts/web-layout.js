const ioniconsScript = document.createElement('script');
ioniconsScript.type = 'module';
ioniconsScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';

const ioniconsNoModuleScript = document.createElement('script');
ioniconsNoModuleScript.noModule = true;
ioniconsNoModuleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';

const logOutScript = document.createElement('script');
logOutScript.textContent = `
window.logout = () => {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.reload();
}`;

/**
 * Template phần header để dễ gắn vào các trang HTML khác
 */
class WebHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        const script = document.createElement('script');

        const user = JSON.parse(sessionStorage.getItem('currentUser') ?? localStorage.getItem('currentUser') ?? 'null');

        script.textContent = `
const root = document.getElementsByTagName('web-header')[0].shadowRoot;
root.querySelectorAll('a[href="' + window.location.pathname + '"]').forEach(a => a.classList.add('active'));
`;
        this.shadowRoot.innerHTML = `
<link rel="stylesheet" href="/styles/header.css">

<header>
    <nav>
        <div id="desktop-nav" class="container">
            <div class="left">
                <a href="/">
                    <img src="/images/logo.png" alt="Route3Go logo" id="logo">
                </a>
                <div class="desktop-menu">
                    <a href="/">Trang chủ</a>
                    <a href="/gioithieu.html">Về chúng tôi</a>
                    <a href="/search.html">Đặt vé</a>
                    <a href="/lienhe.html">Liên hệ</a>
                </div>
            </div>
            <div class="desktop-menu">
                ${user ? `
                    <span class="welcome">Chào mừng, ${user.name}!</span>
                    <a href="#" class="logout" onclick="logout()">Đăng xuất</a>
                ` : `
                    <a href="/dangnhap.html">Đăng nhập</a>
                    <a href="/dangky.html">Đăng ký</a>
                `}
            </div>
            <div id="mobile-button">
                <!-- Mobile menu button -->
                <button type="button" onclick="document.getElementsByTagName('web-header')[0].shadowRoot.getElementById('mobile-menu').classList.toggle('hidden')">
                    <ion-icon name="menu-outline" size="large"></ion-icon>
                </button>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div class="hidden" id="mobile-menu">
            <div>
                <a href="/">Trang chủ</a>
                <a href="/lienhe.html">Liên hệ</a>
                <a href="/search.html">Đặt vé</a>
                <a href="/gioithieu.html">Về chúng tôi</a>
                ${user ? `
                    <span class="welcome">Chào mừng, ${user.name}!</span>
                    <a href="#" class="logout" onclick="logout()">Đăng xuất</a>
                ` : `
                    <a href="/dangnhap.html">Đăng nhập</a>
                    <a href="/dangky.html">Đăng ký</a>
                `}
            </div>
        </div>
    </nav>
</header>`;
        this.shadowRoot.appendChild(script);
        this.shadowRoot.appendChild(ioniconsScript);
        this.shadowRoot.appendChild(ioniconsNoModuleScript);
        this.shadowRoot.appendChild(logOutScript);
    }
};

/**
 * Template phần footer để dễ gắn vào các trang HTML khác
 */
class WebFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<link rel="stylesheet" href="/styles/footer.css">
<footer>
    <section>
        <div>
            <h3>Chăm sóc khách hàng</h3>
            <ul>
                <li>
                    <h4>Điện thoại:</h4>
                    <p>012 345 6789</p>
                </li>
                <li>
                    <h4>Địa chỉ:</h4>
                    <p>Khu II Đại Học Cần Thơ, Đường 3 Tháng 2, P. Ninh Kiều, Cần Thơ</p>
                </li>
                <li>
                    <h4>Email:</h4>
                    <p>hotro@route3go.vn</p>
                </li>
            </ul>
        </div>

        <div>
            <h3>Kết nối</h3>
            <ul>
                <li>
                    <a href="#">
                        <ion-icon name="logo-facebook"></ion-icon>Facebook
                    </a>
                </li>
                <li>
                    <a href="#">
                        <ion-icon name="logo-instagram"></ion-icon>Instagram
                    </a>
                </li>
                <li>
                    <a href="#">
                        <ion-icon name="logo-twitter"></ion-icon>Twitter
                    </a>
                </li>
            </ul>
        </div>

        <div>
            <h3>Route3Go</h3>
            <ul>
                <li>
                    <a href="/gioithieu.html">Về chúng tôi</a>
                </li>
                <li>
                    <a href="/search.html">Lịch trình</a>
                </li>
                <li>
                    <a href="/">Tin tức</a>
                </li>
                <li>
                    <a href="/lienhe.html">Tuyển dụng</a>
                </li>
                <li>
                    <a href="/dangnhap.html">Đăng nhập</a>
                </li>
                <li>
                    <a href="/dangky.html">Đăng ký</a>
                </li>
            </ul>
        </div>

        <div>
            <h3>Hỗ trợ</h3>
            <ul>
                <li>
                    <a href="#">Tra cứu thông tin vé</a>
                </li>
                <li>
                    <a href="#">Điều khoản & sử dụng</a>
                </li>
                <li>
                    <a href="#">Câu hỏi thường gặp</a>
                </li>
                <li>
                    <a href="#">Hướng dẫn đặt vé</a>
                </li>
            </ul>
        </div>
    </section>

    <p id="copyright">
        © 2025 | Bản quyền thuộc về Công ty Route3Go – Cần Thơ | Chịu trách nhiệm quản lý nội dung: Nhóm 03.
    </p>
</footer>`;
        this.shadowRoot.appendChild(ioniconsScript);
        this.shadowRoot.appendChild(ioniconsNoModuleScript);
    }
};

customElements.define('web-header', WebHeader);
customElements.define('web-footer', WebFooter);

// Thủ thuật: gắn header và footer vào body
document.body.prepend(new WebHeader());
document.body.append(new WebFooter());