const  GENTSE_FEEST_CATEGORIES_DAY = 'https://www.pgm.gent/data/gentsefeesten/categories.json';
const GENTSE_FEEST_EVENTS_DAY  = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';

(() => {
	const app = {
		initialize() {
			console.log('1. Application started');
			this.cacheElements();
			this.buildUI();
      this.registerHTMLForListeners();
      this.getDataEvents();
      this.getDataCategory()
		},
		cacheElements() {
      console.log('2. cache all existing DOM elements');
      this.$artist__day = document.querySelector('.artist__day');
      this.$categories = document.querySelector('.category__list');
      this.$middle__section = document.querySelector('.middle__section');
      this.$left__dates = document.querySelectorAll('.left__dates a');
      this.$main__details = document.querySelector('.main__details');
     
		},
		buildUI() {
      console.log('3. Build the user interface');
    },
    
		registerHTMLForListeners() { 
      
    },

    getDataEvents(){
      fetch(GENTSE_FEEST_EVENTS_DAY ) 
      .then((response)=> response.json())
      .then((json)=>{
        this.events = json;
        // console.log(json)
      })
      .catch((error)=> {
        console.log(error);
      });
    },
    getDataCategory(){
      fetch(GENTSE_FEEST_CATEGORIES_DAY ) 
      .then((response)=> response.json())
      .then((json)=>{
        this.categories = json;
        this.showcatergories();
        // this.getDataEvents();
        // console.log(json);
        this.getQuaryParameter();
        
      })
      .catch((error)=>{ 
        console.log(error)});

    },
    showcatergories(){
      let categorieEventsHtml = this.categories.map((categorie) => {
       return `
          <li>
            <a href="#${categorie}">
              <h4>${categorie}<h4>
            </a>
          </li>
       `;
    }).join('');
      this.$categories.innerHTML = categorieEventsHtml; 
  },
    getQuaryParameter(){
      console.log('start query');
      const search = window.location.search;
      const params = new URLSearchParams(search);
         urlDay = params.get('day');
         urlSlug = params.get('slug')
         this.gentseFeestenProgramForHtml(urlDay)
        //  this.gentseFeestenDetailsForHtml(urlDay,urlSlug)
    },
    gentseFeestenProgramForHtml(url){
      if(  url !== null){  
        for (const iterator of this.$left__dates) {
          if (iterator.getAttribute("data-att") === url){
            iterator.classList.add("active");
          } 
          
        };
        const viewCategories = this.categories.map((category) =>{
        const filterEvents = this.events.filter((event) => {
           if(event.day === url){
             return event.category.indexOf(category) > -1;
           }  
        });
        const eventListItems = filterEvents.map((event)=>{
          let placeHolder = "static/media/default.jpg";
          return`
            <li>
              <a href="detail.html?day=${url}&slug=${event.slug}">
                <div class="card__img" >
                  <img src="${event.image !== null ? event.image.thumb : placeHolder}" alt="">
                </div>
                <div class="day--info">
                <div class="grouping">
                  <div class="artist__day--info">
                    <h4>${event.start} u.</h4>
                  </div>
                  
                    <h3 class="card__title">${event.title}</h3>
                </div>  
                    <p>${event.location}</p>
                 
                </div>
               </a>
              </li> 
          `;
        }).join('');

        return`
          <article>
            <div class="backtotop">
              <h2 id="${category}">${category}</h2>
              <a href="#">
              <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8.683 0L6.785 1.885l4.118 4.118H0v2.661h10.903l-4.118 4.117 1.898 1.886L16 7.333z" fill="#000" fill-rule="nonzero"/></svg>
              </a>
            </div>
              <ul class="artist__day program__list card">
                  ${eventListItems}
              </ul>
          </article>
        `;
      }).join('');
      this.$middle__section.innerHTML = viewCategories; 
      }
    },
   
	};
	app.initialize();
})();

