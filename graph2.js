
 class graphConnector extends HTMLElement{ 
   
  constructor(apiServer){
    super()
    this.apiServer = this.getAttribute("api-server")
  }
  
  async getData(query){

    return fetch(this.apiServer, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query
                ,
          }),
        })
          .then((res) => res.json())
          .then((result) => {return result});
    
      }
    }

customElements.define("graph-connector",graphConnector)








class continentsList extends HTMLElement{
  constructor(){
    super()

    this.query = `{
      continents{
        name
      code
      }
      }`
      this.shadow = this.attachShadow({mode:"open"})
      this.getContinents()

  }

 async getContinents(){
   let x = await connector.getData(this.query)

    this.shadow.innerHTML = `<select id="continentsSelect"> ${await x.data.continents.reduce( (result,el) =>{
      return result += `<option value="${el.code}">${el.name}</option>`
     },"")}<select>`
     this.continentsList = this.shadow.getElementById("continentsSelect")
     this.continentsList.onchange = ()=>{
       
      dispatchEvent(new CustomEvent("continentChange",{detail:this.continentsList.value}))
      // countries.setAttribute("selected-continent",this.continentsList.value)
    
    }
  }

}

customElements.define("continent-input", continentsList)




class countriesList extends HTMLElement{
  static get observedAttributes() { return ['selected-continent']; }

    constructor(){
      super()

      this.selectedContinent = this.getAttribute("selected-continent")


       this.countries = document.createElement("table")
        this.appendChild(this.countries)
      this.showData()
      addEventListener("continentChange",(e)=>{
        this.selectedContinent = e.detail
        this.showData()})
    }
    
    

    async showData(){
      this.query = `{
        continent(code: "${this.selectedContinent}"){
          name
            countries{
            name
            native
            currency
          languages{
            name
          }
          }
        }
        }
        `
      let countriesList = await connector.getData(this.query)
      console.log(countriesList.data.continent.countries)
      this.countries.innerHTML = countriesList.data.continent.countries.reduce( (result,el) =>{
       return result += `<tr><td>${el.name}</td> <td>${el.native}</td><td>${el.currency}</td></tr> `
      },"<th>nazwa kraju</th><th>narodowosc</th><th>waluta</th>")
    }
} 

customElements.define("countries-list", countriesList)




// ZROBIC TABELE Z DIVOW 

// HASLA DO PORTFOLIO: WEB COMPONENTS - CUSTOM ELEMENTS , Object Oriented programming - Classes, PROTOTYPE CZYLI ASSIGN/CREATE , FUNCTIONAL PROGRAMMING - NP MAP REDUCE FILTER FOREACH, FETCH API - GRAPHQL I REST, TO JEST JS
// HASLA CSS : CSS VARIABLES, PSEUDOELEMENTS, TRANSITION, ANIMATION - KEYFRAMES, MEDIA QUERIES - RWD, FLEX LAYOUT

// terminy po angielsku

// lista do selectu a nie inputu


// TAG DETAILS <SUMMARY> NAZWA MIASTA<SUMMARY> A RESZTA INFORMACJI W CIELE DETAILS NP TABLE W DETAILS