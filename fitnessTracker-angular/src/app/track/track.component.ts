import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router'; 
import { ChartsModule} from 'ng2-charts';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent  {

  
 user : any
 _url: any
 workout : any
 dayId :any
 exercise : any
 actualAmount :any[]=[]
 doneAmount:any[]=[]
 v : any[]=[];
 exercise_detail:String=""
 flag:boolean
 

 public chartType: string = 'line';

  constructor(private router:Router,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => { this.dayId = params['id']; });
   }

   public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
  }
  };
  
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'expected'},
    {data: [], label: 'actual'}
  ];

  ngOnInit() {
    


    window.history.forward();
    this._url = `http://localhost:8010/search`
    var dec = CryptoJS.AES.decrypt(localStorage.getItem("token"),"randomPassphrase");
    fetch(this._url,{
        method : "POST",
        headers: {
            "content-type": "application/json"
           },
        body : JSON.stringify({
            email :dec.toString(CryptoJS.enc.Utf8)
        })
    })
    .then(res=>res.json())
    .then(data=>{
     this.user = data
        this._url = `http://localhost:8010/workout/`
        fetch(this._url+data.category,{
            method : "GET",
            headers: {
                "content-type": "application/json"
              }
            })
        .then(res=>res.json())
        .then(result=>{
          this.workout = result;
          this.exercise= this.workout[this.dayId-1].workout
          this._url = `http://localhost:8008/getDetailsByDay`
          fetch(this._url,{
              method : "POST",
              headers: {
                  "content-type": "application/json"
                },
              body : JSON.stringify({
                  email :dec.toString(CryptoJS.enc.Utf8),
                  dayno : this.dayId
              })
          })
          .then(res=>res.json())
          .then(data=>{
            if(data.message=='error'){
              this.flag = true;
             
            }
            else{
              this.flag = false;
              this.doneAmount= data.exercise.split(",");
              
                var i;
                for(i=0;i<this.workout[this.dayId-1].workout.length;i++)
                {
                this.actualAmount.push(this.exercise[i].amount); 
                }

               
                var i;
                for(i=0;i<this.workout[this.dayId-1].workout.length;i++)
                {
                this.barChartLabels.push(this.exercise[i].exerciseName);
                }
               
               this.barChartData[0].data = this.actualAmount
              this.barChartData[1].data = this.doneAmount
            }
                  
        })
      })
    })
      
    }

  getValues(v)
  {
    if (!confirm("Are you sure!! Once submitted cannot be undone.")) {
      return false;
    } 
    (<HTMLInputElement> document.getElementById("btn")).disabled = true;
    this.barChartData[0].data = []
    this.barChartData[1].data =[]
    this.doneAmount=[]
    this.actualAmount=[]
    this.barChartLabels=[]
  
    this.doneAmount=Object.values(v);
  
    var i;


     for(i=0;i<this.workout[this.dayId-1].workout.length;i++)
     {
      this.actualAmount.push(this.exercise[i].amount);
      
     }

 
     var i;
     for(i=0;i<this.workout[this.dayId-1].workout.length;i++)
     {
      this.barChartLabels.push(this.exercise[i].exerciseName);
     }
      
     this.exercise_detail = this.doneAmount.join(",");

    this.barChartData[0].data = this.actualAmount
    this.barChartData[1].data = this.doneAmount

    var dec = CryptoJS.AES.decrypt(localStorage.getItem("token"),"randomPassphrase");

    this._url = `http://localhost:8008/saveDetails`
    fetch(this._url,{
      method : "POST",
      headers: {
          "content-type": "application/json"
         },
      body : JSON.stringify({
        
         email :dec.toString(CryptoJS.enc.Utf8),
         dayno : this.dayId,
          exercise: this.exercise_detail
      })
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.message!=null){
      console.log(data.message);
      
    }
   
  })
 
  }

  
  signout(){
    localStorage.removeItem("token");
    this.router.navigate(['login']);

  }

  
}

