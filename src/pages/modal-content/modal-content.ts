import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Chart} from 'chart.js';

/**
 * Generated class for the ModalContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
})
export class ModalContentPage {


  @ViewChild('barCanvas') barCanvas;
 
  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(private navParams: NavParams, private view: ViewController) {
  }

  closeModal () {
    this.view.dismiss();
    


  }
  ionViewDidLoad() {

    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: ["1", "2", "3","4", "5", "6"],
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderColor:'rgba(255, 99, 132, 0.2)',
            datasets: [{
                label: '# of days',
                data: [12, 19, 3, 5, 2, 3, 4, 7, 4, 2],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                  gridLines: {
                      offsetGridLines: true
                  }
              }]
            }
        }
  
    });
  
  }
  
  
  }
