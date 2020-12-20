const  GENTSE_FEESTEN_CATEGORIES = 'https://www.pgm.gent/data/gentsefeesten/categories.json';
const GENTSE_FEESTEN_EVENTS = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';

(() => {
	const app = {
		initialize() {
			console.log('1. Application started');
			this.cacheElements();
			this.buildUI();
      this.registerHTMLForListeners();
      this.getDataFromGentseFeestenEventsApiEndpoint();
      // this.getQuaryParameter();
		},
		cacheElements() {
			console.log('2. cache all existing DOM elements');
			this.$navigation__side = document.querySelector('.navigation__side');
      this.$hamburger = document.querySelector('.hamburger');  
      this.$btnCloseMenu = document.querySelector('.btn__closing--menu'); 
      this.$program__side = document.querySelector('.program__side'); 
      this.$program__dates = document.querySelector('.program__side--dates'); 
      this.$artist__list = document.querySelector('.artist__list'); 
      this.$left__dates = document.querySelectorAll('.left__dates a')
      this.$header = document.querySelector('.header');
      this.$artist__day = document.querySelector('.artist__day');
      this.$navigation__main__side = document.querySelectorAll('.navigation__main a');
      this.$display__list = document.querySelector('.display__list');
      this.$display__raster = document.querySelector('.display__raster');
      this.$middle__section = document.querySelector('.middle__section');
      // console.log(this.$display__list);
      // console.log(this.$display__raster);
		},
		buildUI() {
      console.log('3. Build the user interface');
     
		},
		registerHTMLForListeners() {
      if(this.$display__list) { 
        this.$display__list.addEventListener('click', () =>{
          this.toggleProgramView();
        });
        this.$display__raster.addEventListener('click', () =>{
          this.toggleProgramView();
        });
      };
     
      window.addEventListener('load', (event) => {
        this.randomBackgroundPic();
    });
       
      this.$hamburger.addEventListener('click', () => {
        // console.log('i work');
        this.showSideMenu(); 
    });
      this.$btnCloseMenu.addEventListener('click', () =>{
        this.removeSideMenu();
      });
      this.$program__side.addEventListener('click', () =>{
        this.showProgramSide();
      });
      for (const iterator of this.$navigation__main__side) {
        iterator.addEventListener('click',() =>{
          this.toggleActiveStateMenu(iterator) 
        })
      }
    },
    showProgramSide(){
      if(this.$program__dates.classList.contains('fold')){
        this.$program__dates.classList.remove('fold');
      }else{
        this.$program__dates.classList.add('fold');}
    },
    removeSideMenu(){
      this.$navigation__side.classList.remove('hidden');
    },

		showSideMenu() {
      this.$navigation__side.classList.add('hidden');
    },
    getDataFromGentseFeestenEventsApiEndpoint(){
      fetch(GENTSE_FEESTEN_EVENTS) 
      .then((response)=> response.json())
      .then((json)=>{
        this.events = json;
        this.gentseFeestenEventBuildUI();
        this.getQuaryParameter();
      })
      .then()
      .catch((e)=> {
        console.log(e);
      });
    },
    getDataFromGentseFeestenCategoryApiEndpoint(){
      fetch(GENTSE_FEESTEN_CATEGORIES) 
      .then((response)=> response.json())
      .then((json)=>{
        this.categories = json;
        this.getDataFromGentseFeestenEventsApiEndpoint()
      })
      .catch((e)=> console.log(e));

    },
    toggleProgramView(){
      this.$display__list.classList.toggle('active__button');
      this.$display__raster.classList.toggle('active__button');
      this.$middle__section.classList.toggle('list')
    },
    getDayOfPerfomance(eventDay) {
			let day = eventDay;
			switch (day) {
				case '19': case'26':
					day = 'Vr';
					break;
				case '20' : case '27':
					day = 'Za';
					break;
				case '21' : case '28':
					day = 'Zo';
					break;
				case '22':
					day = 'Mo';
					break;
				case '23':
					day = 'Di';
					break;
				case '24':
					day = 'Wo';
					break;
				case '25':
					day = 'Do';
					break;
			}
			return day;
		},
    gentseFeestenEventBuildUI(){
      if(this.$artist__list) {
        
        this.$artist__list.innerHTML = this.events.slice(0, 3).map((artist) => {
         
           return `
            <li>
              <a href="detail.html?day=${artist.day}&slug=${artist.slug}">
                <div class="card__img" >
                  <img src="${artist.image !== null ? artist.image.thumb : ''}" alt="">
                </div>
                <div class="day--info">
                  <div class="artist__day--info">
                    <h4 > ${this.getDayOfPerfomance(artist.day)} ${artist.day} Jul ${artist.start} u.</h4>
                  </div>
                  <div class="card-body">
                    <h3 class="card__title">${artist.title}</h3>
                    <p>${artist.location}</p>
                  </div>
                </div>
              </a>
            </li> `
          ;
          
        }).join('');
        
      }
      
    },
    toggleActiveStateMenu(element){
      for (const index of this.$navigation__main__side) {
        index.classList.remove("active__menu");
    } 
      element.classList.add("active__menu");
      //this is not working
    },
    randomBackgroundPic(){
      var chosenPic = Math.floor((Math.random() * 9) + 1);
      this.$header.style.background = `url("static/media/Gentse-feesten-0${chosenPic}.jpg") 35% center / cover no-repeat`;
    },
    getQuaryParameter(){
      console.log('start query');
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const urlDay = params.get('day');
     
      if (urlDay !== null){
        let selected__day = '';
        selected__day = this.events.filter((dt) => dt.day === urlDay);
        console.log(selected__day);
        this.$artist__day.innerHTML = selected__day.slice(0, 3).map((day) => {
          let placeHolder = "static/media/default.jpg";
          return `
            <li>
              <a href="detail.html?day=${day.day}&slug=${day.slug}">
                <div class="card__img" >
                  <img src="${day.image !== null ? day.image.thumb : placeHolder}" alt="">
                </div>
                <div class="day--info">
                  <div class="artist__day--info">
                    <h4>${day.start} u.</h4>
                  </div>
                  <div class="card-body">
                    <h3 class="card__title">${day.title}</h3>
                    <p>${day.location}</p>
                  </div>
                </div> // console.log(iterator)
               </a>
              </li> 
          `;
      }).join('');
      

     
        for (const iterator of this.$left__dates) {
          if (iterator.getAttribute("data-att") === urlDay){
            iterator.classList.add("active");
          } 
         
         
        }

      }
    }  
	};
	app.initialize();
})();