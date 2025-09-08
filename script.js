
const themeSwitch = document.getElementById("switchCheckDefault");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-bs-theme", "dark"); // مخصوص بوت‌استرپ ۵.۳+
      themeSwitch.checked = true;
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
      themeSwitch.checked = false;
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      applyTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      applyTheme("light");
      localStorage.setItem("theme", "light");
    }
  });


// cards

const cardSection = document.querySelector(".card-section");

const projectItems = [
    {
        id:1 ,
        title: "سایت تپسی" ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: true,
        link: "card link1",
    },
        {
        id:2,
        title: "سبد خرید" ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: false,
        link: "card link2",
    },
    {
        id:3,
        title: "صفحه محصول " ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: true,
        link: "card link3",
    },
    {
        id:4,
        title: "todo list" ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: true,
        link: "card link4",
    },
    {
        id:5,
        title: "shop-admin" ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: false,
        link: "card link5",
    },
    {
        id:6,
        title: "seo" ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: true,
        link: "card link6",
    },
]


function displayItem(projectItems){
  const result= projectItems.map((item)=>CreateCard(item)).join("");
  cardSection.innerHTML= result;
}

function CreateCard(item){
    return `
         <div class="col">
         <div class="card shadow">
        <div class="card-body">
         <h5 class="card-title d-inline">${item.title}</h5>
        <span class="badge rounded-pill  float-start ${item.completed ? "text-bg-success" : "text-bg-warning" }">${item.completed? "تکمیل" : "در حال اجرا"}</span>
         <p class="card-text">${item.description}</p>
         <a href="#" class="card-link">${item.link}</a>
        </div>
        </div>
        </div>
    `
}

        displayItem(projectItems);
