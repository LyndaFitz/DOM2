var menuLinks = [
    { text: "about", href: "/about" },
    {
        text: "catalog", href: "#", subLinks: [
            { text: "all", href: "/catalog/all" },
            { text: "top selling", href: "/catalog/top" },
            { text: "search", href: "/catalog/search" },
        ]
    },
    {
        text: "orders", href: "#", subLinks: [
            { text: "new", href: "/orders/new" },
            { text: "pending", href: "/orders/pending" },
            { text: "history", href: "/orders/history" },
        ]
    },
    {
        text: "account", href: "#", subLinks: [
            { text: "profile", href: "/account/profile" },
            { text: "sign out", href: "/account/signout" },
        ]
    },
];

const mainEl = document.getElementsByTagName("main")[0];
mainEl.style.backgroundColor = "grey";

const mainElHeader = document.createElement("h1");
mainElHeader.innerHTML = "DOM Manipulation";
mainEl.appendChild(mainElHeader);
mainEl.classList.add("flex-ctr");

const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

// Create top menu links
for (let i = 0; i < menuLinks.length; i++) {
    const aEl = document.createElement("a");
    aEl.setAttribute("href", menuLinks[i].href);
    aEl.textContent = menuLinks[i].text;
    topMenuEl.appendChild(aEl);
}

// Submenu setup
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute"; // Positioning for hiding
subMenuEl.style.top = "0"; // Initially hidden

// Event listener for top menu
topMenuEl.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;

    console.log(event.target.textContent);

    const topMenuLinks = topMenuEl.getElementsByTagName("a");
    for (let link of topMenuLinks) {
        link.classList.remove('active');
    }
    event.target.classList.toggle('active');

    const linkObj = menuLinks.find(link => link.text === event.target.textContent);
    if (linkObj && linkObj.subLinks) {
        subMenuEl.style.top = "100%"; // Show submenu
        buildSubmenu(linkObj.subLinks);
    } else {
        subMenuEl.style.top = "0"; // Hide submenu
    }
});

// Function to build the submenu
function buildSubmenu(subLinks) {
    subMenuEl.innerHTML = ''; // Clear current contents
    subLinks.forEach(link => {
        const aEl = document.createElement('a');
        aEl.setAttribute('href', link.href);
        aEl.textContent = link.text;
        subMenuEl.appendChild(aEl);
    });
}

// Event listener for submenu
subMenuEl.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;

    console.log(event.target.textContent);
    subMenuEl.style.top = "0"; // Hide the submenu
    mainElHeader.innerHTML = event.target.textContent; // Update main header
});
