import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css'
import '@pnotify/core/dist/PNotify.css';

const mainAddr = 'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/'

export default {
    page: 1,
    query:'',
    per_page:4,
    fetchImg(callback){
    
        
    //     const options = {
    //         headers:{
    //         Auth:'16947860-09cbfc9ac0ccf00e2776d07e9',
            
    //     },
    // };
    const Auth ='16947860-09cbfc9ac0ccf00e2776d07e9';
    const reqParam = `?key=${Auth}&image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.per_page}`;
        
        fetch(mainAddr + reqParam)
        .then(res=>{
            // console.log(res.type);
            if (res.ok){
                // console.log('все супер!');
                this.page +=1;
                // console.log(this.page)
                return res.json();
            }
            else {
                // console.log('все жопа!');
                return Promise.reject(res)
            }
        })
        .then(d=>{
            // console.log(d);
            callback(d)})
        .catch(err=>{
            console.warn('No found any data.Error 404.');
            // console.log(error)
            const myError = error({
                text: "No matches found. Please enter another query!",
                delay: 2000
              });
        });
    },
    get searchQuery(){
        return this.query;
    },
    set searchQuery(string){
        this.query=string;
    },

    resetPage(){
        
        this.page = 1; 
    }
}
