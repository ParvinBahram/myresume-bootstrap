
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
        category : "html-css" ,
        createdAt :"1/4/2023",
    },
        {
        id:2,
        title: "سبد خرید" ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: false,
        link: "card link2",
        category : "js",
        createdAt :"2/2/2023",
    },
    {
        id:3,
        title: "صفحه محصول " ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: true,
        link: "card link3",
        category: "tailwind",
        createdAt :"08/15/2023",
    },
    {
        id:4,
        title: "todo list" ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: true,
        link: "card link4",
        category: "react" ,
        createdAt :"4/11/2024",
    },
    {
        id:5,
        title: "shop-admin" ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: false,
        link: "card link5",
        category:"next" ,
        createdAt :"3/1/2025",
    },
    {
        id:6,
        title: "seo" ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: true,
        link: "card link6",
        category: "seo",
        createdAt :"7/22/2024",
    },
     {
        id:7 ,
        title: "سایت رزومه" ,
        description :" Lorem, ipsum dolor sit amet consectetur adipisicing elit. " ,
        completed: false,
        link: "card link1",
        category : "bootstrap" ,
        createdAt :"7/9/2025",
    },
]


function displayItem(projectItems){
  const result= projectItems.map((item)=>CreateCard(item)).join("");
  cardSection.innerHTML= result;
}

function CreateCard(item){
    return `
         <div class="col-md-6 col-lg-4">
         <div class="card shadow">
        <div class="card-body">
         <h5 class="card-title d-inline">${item.title}</h5>
        <span class="badge rounded-pill  float-start ${item.completed ? "text-bg-success" : "text-bg-warning" }">${item.completed? "تکمیل" : "در حال اجرا"}</span>
         <p class="card-text">${item.description}</p>
         <a href="#" class="card-link float-start"  style="color:blue">${item.link}</a>
         <span class="" style="color:black" >${item.createdAt}</span>
        </div>
        </div>
        </div>
    `
}
        displayItem(projectItems);



        // category filter

  const categoryItems = document.querySelectorAll("#category-items .dropdown-item");

  let selectedCategories = [];

      categoryItems.forEach((item) => {
       item.addEventListener("click", (e)=>{
       e.preventDefault();
       
      const category = e.target.textContent;

        if(category === "all"){
          selectedCategories = [];
        categoryItems.forEach(i => i.classList.remove("active"));
        e.target.classList.add("active");
        displayItem(projectItems);
        return;
        }


      if(selectedCategories.includes(category)){
        selectedCategories= selectedCategories.filter((c) => c !== category);
        e.target.classList.remove("active");
      }else{
        selectedCategories.push(category);
        e.target.classList.add("active");
      }
        categoryItems.forEach(i => {
        if (i.textContent.trim() === "all")  i.classList.remove("active");
      });
    
      console.log("selected:" , selectedCategories)

      let filteredProjects ;

      if(selectedCategories.length === 0 )  filteredProjects = projectItems ;
      else {
        filteredProjects = projectItems.filter(p => selectedCategories.includes(p.category)
        )}
      displayItem(filteredProjects);
      })
    })
  


    // date filter

    const startDate = new Date("2023-1-1");
    const endDate = new Date("2025-12-30");

     const oneDay = 24*60*60*1000 ;

      function dateToDays(date){
        return Math.floor((new Date(date) - startDate)/ oneDay);
      }

      function daysToDate(days) {
      const d = new Date(startDate.getTime() + days * oneDay);
      return d.toLocaleDateString("en-US"); 
    }

    const fromRange = document.querySelector("#from-range");
    const toRange = document.querySelector("#to-range");
    const fromValue = document.querySelector("#from-value");
    const toValue = document.querySelector("#to-value");

    fromRange.min = 0;
    fromRange.max = dateToDays(endDate);
    fromRange.value = 0;

    toRange.min = 0;
    toRange.max = dateToDays(endDate);
    toRange.value = dateToDays(endDate);


    fromValue.textContent = daysToDate(fromRange.value);
    toValue.textContent = daysToDate(toRange.value);

    
    function FilterByDate(){
      const fromDays = parseInt(fromRange.value);
      const toDays = parseInt(toRange.value);

      const filtered = projectItems.filter((p)=>{
        const projectDays = dateToDays(p.createdAt);
        return projectDays >= fromDays && projectDays <= toDays;
      })
      displayItem(filtered)
    }

    fromRange.addEventListener("input", () => {
      fromValue.textContent = daysToDate(fromRange.value);
      FilterByDate()
    });

    toRange.addEventListener("input", () => {
      toValue.textContent = daysToDate(toRange.value);
      FilterByDate();
    });


    // status filter
    const completedProject = projectItems.filter(p => p.completed);
    const checkInput = document.querySelector("#check-input");

    checkInput.addEventListener("change", ()=>{
      if (checkInput.checked) displayItem(completedProject);
      else {displayItem(projectItems)};
    })