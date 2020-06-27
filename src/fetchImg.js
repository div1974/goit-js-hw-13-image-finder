import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css'
import '@pnotify/core/dist/PNotify.css';

const mainAddr = 'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/'

export default {
    page: 1,
    query:'',
    per_page:12,
    fetchImg(callback){
    
        
    
    const Auth ='16947860-09cbfc9ac0ccf00e2776d07e9';
    const reqParam = `?key=${Auth}&image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.per_page}`;
        
        fetch(mainAddr + reqParam)
        .then(res=>{
           
            if (res.ok){
           
                this.page +=1;
           
                return res.json();
            }
            else {
            
                return Promise.reject(res)
            }
        })
        .then(d=>{
            
            callback(d)})
        .catch(err=>{
            console.warn('No found any data.Error 404.');
            
            const myError = error({
                text: "No matches found. Please enter another query!",
                delay: 2000
              });
        });
    },
    get searchQuery(){
        return this.query;
    },
    set searchQuery(str){
        this.query = str;
    },

    resetPage(){
        
        this.page = 1; 
    }
}
