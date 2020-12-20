const  GENTSE_FEEST_CATEGORIES_DETAILS = 'https://www.pgm.gent/data/gentsefeesten/categories.json';
const GENTSE_FEEST_EVENTS_DETAILS = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';

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
      this.$left__dates = document.querySelectorAll('.left__dates a');
      this.$main__details = document.querySelector('.main__details')
		},
		buildUI() {
      console.log('3. Build the user interface');
     
		},
		registerHTMLForListeners() {
      
    },
    
    getDataEvents(){
      fetch(GENTSE_FEEST_EVENTS_DETAILS) 
      .then((response)=> response.json())
      .then((json)=>{
        this.events = json;
        // console.log(json)
        this.getQuaryParameterDetails();
      })
      .catch((error)=> {
        console.log(error);
      });
    },
    getDataCategory(){
      fetch(GENTSE_FEEST_CATEGORIES_DETAILS) 
      .then((response)=> response.json())
      .then((json)=>{
        this.categories = json;
        // this.getDataEvents();
        // console.log(json); 
      })
      .catch((error)=>{ 
        console.log(error)});

    },
    getQuaryParameterDetails(){
      console.log('start query');
      const search = window.location.search;
      const params = new URLSearchParams(search);
         urlDay = params.get('day');
         urlSlug = params.get('slug')
         this.gentseFeestenDetailsForHtml(urlDay,urlSlug)
    },
    gentseFeestenDetailsForHtml(url,urlSlug){
      if(  url !== null && urlSlug !== null){
        const filterDetails = this.events.map((event) => {
           if(event.day === url && event.slug === urlSlug){
            //  console.log(event.slug);
            let placeHolder = "static/media/default.jpg";
            let wheelchair = "static/media/wheelchair.svg";
      
            return `
              <div class="main__detail--inner">
                <div class="main__detail--img">
                  <img src="${event.image !== null ? event.image.full : placeHolder}" alt="">
                </div>
                <div class="detail__title">
                  <h2>
                  ${event.title}
                  </h2>
                  <div class="location">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>marker</title><path d="M16.5 10.568c-2.209 0-4 1.791-4 4s1.791 4 4 4v0c2.209 0 4-1.791 4-4s-1.791-4-4-4v0M16.5 13.568c0.551 0 1 0.45 1 1s-0.449 1-1 1-1-0.449-1-1c0-0.55 0.449-1 1-1M16.5 3c-6.351 0-11.5 5.15-11.5 11.5 0 8.363 11.5 14.636 11.5 14.636s11.5-6.273 11.5-14.636c0-6.35-5.149-11.5-11.5-11.5M16.5 6c4.687 0 8.5 3.813 8.5 8.5 0 4.592-5.253 9.003-8.5 11.131-3.249-2.13-8.5-6.54-8.5-11.13 0-4.689 3.813-8.501 8.5-8.501"></path></svg>
                    <h4>${event.location}</h4>
                  </div>
                  <div class="timeDate__details">
                   <h4>${event.day_of_week} - ${event.day} ${event.start} u  <span class="arrow_right"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612"><path d="M604.501 134.782c-9.999-10.05-26.222-10.05-36.221 0L306.014 422.558 43.721 134.782c-9.999-10.05-26.223-10.05-36.222 0s-9.999 26.35 0 36.399l279.103 306.241c5.331 5.357 12.422 7.652 19.386 7.296 6.988.356 14.055-1.939 19.386-7.296l279.128-306.268c9.998-10.048 9.998-26.322-.001-36.372z"/></svg></span>  ${event.end} u</h4> 
                  </div>
                </div>
                <div class="act__description">
                  <p>${event.description !== undefined ? event.description: ''}</p>
                </div>
                <div class="detail__list--items">
                  <ul class="detail__topList">
                    <li class="detail__topList--inner">
                      <p class="detail__strong">Website:</p>
                      <a href="${event.url}">${event.url !== null ? event.url  : '-'}</a>
                    </li>
                    <li class="detail__topList--inner">
                    <p class="detail__strong" >Organisator:</p>
                    <p>${event.organizer !== null ? event.organizer  : ''}</p>
                    </li>
                    <li class="detail__topList--inner">
                    <p class="detail__strong" >Categorieën:</p>
                    <p>${event.category}</p>
                    </li>
                    <li class="detail__topList--inner">
                    <p class="detail__strong">Leeftijd:</p>
                    <a>0-100</a>
                  </li>
                    <li class="detail__topList--inner">
                      <p class="detail__strong">Prijs:</p>
                      <a>€1,00</a>
                    </li>
                    <li>
                      <img src="${event.wheelchair_accessible !== false ? wheelchair :''}">
                      <span></span>
                    </li>
                    <li>
                      <ul class="detail__social--icons">
                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.37 7.277c.014.21.014.419.014.628 0 6.391-4.864 13.755-13.755 13.755-2.739 0-5.283-.793-7.424-2.17.39.045.764.06 1.168.06 2.26 0 4.34-.763 6.002-2.066a4.843 4.843 0 01-4.52-3.352c.299.045.598.074.913.074.434 0 .868-.06 1.272-.164a4.835 4.835 0 01-3.877-4.745v-.06c.644.36 1.392.584 2.185.614a4.831 4.831 0 01-2.155-4.026c0-.898.24-1.721.659-2.44a13.742 13.742 0 009.968 5.059 5.46 5.46 0 01-.12-1.108 4.832 4.832 0 014.835-4.834c1.392 0 2.649.584 3.532 1.527a9.518 9.518 0 003.068-1.168 4.821 4.821 0 01-2.125 2.664 9.692 9.692 0 002.784-.748 10.391 10.391 0 01-2.425 2.5z"/></svg></li></a>
                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.072 13.474l.655-4.269h-4.096v-2.77c0-1.168.572-2.306 2.407-2.306H17.9V.494S16.21.206 14.594.206c-3.373 0-5.578 2.044-5.578 5.746v3.253h-3.75v4.27h3.75v10.32h4.615v-10.32h3.441z"/></svg></li></a>
                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill-rule="evenodd"><rect x="5.7" y="9" width="6" height="6" rx="3"/><rect x="13.3" y="9" width="6" height="6" rx="3"/></g></svg></li></a>
                      </ul>
                    </li>
                  </ul>
                     
              </div>
            `;
           }  
        }).join('');this.$main__details.innerHTML = filterDetails;
    }
  }
	};
	app.initialize();
})();