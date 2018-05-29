import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseProvider } from "../../providers/database/database";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { EfaringsdetailjerPage } from '../efaringsdetailjer/efaringsdetailjer';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';
import { ExperienceModalPage } from "../experience-modal/experience-modal";


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
    categories: any[];
    category: any[];
    key: number;
    nyErfaringsArray: any[];
    internshipCount: any;
    finalArray = [];
    hest = [];
    categoryName: any;

    constructor(private navParams: NavParams, private view: ViewController, public navCtrl: NavController, private afAuth: AngularFireAuth, private _DB: DatabaseProvider, private modalCtrl: ModalController) {
        console.log(navParams.get('value'));
        this.internshipCount = navParams.get('value');
        this.afAuth.authState.subscribe(res => {
            let db = firebase.firestore()
            this._DB.getDocuments("erf")
                .then((data) => {
                    if (data.length === 0) {
                        console.log("nope");
                    }
                    else {
                        // this.information = data;
                        var kategorier = new Array();
                        var testArray = new Array();
                        for (var key in data) {
                            var i = 0;
                            let db = firebase.firestore()
                            let path = "users/" + res.uid + "/erfaringer";

                            db.collection(path).where("parent", "==", data[key].kategoriNummer).where("internship", "==", navParams.get('value'))
                                .get()
                                .then(querySnapshot => {
                                    if (!querySnapshot) {
                                        console.log("sorry, no data");
                                    } else {
                                        this.nyErfaringsArray = [];
                                        querySnapshot.docs.forEach(docSnap => {
                                            this.nyErfaringsArray.push(docSnap.data());


                                        })

                                    }
                                    testArray.push(data[i].navn);
                                    kategorier.push({
                                        parent: data[i].navn,
                                        child: this.nyErfaringsArray,
                                    })
  
                                    var map = new Map();

                                    kategorier.forEach(data => {
                                        Object.keys(data.child).forEach(d => {
                                            let currKey = JSON.stringify(data.child[d].id);
                                            let currValue = map.get(currKey);
                                            if (currValue) {
                                                currValue.childtest.count += 1;
                                                map.set(currKey, currValue);
                                            } else {
                                                let newObj = {
                                                    parent: data.parent,
                                                    childtest: {
                                                        childId: data.child[d].id,
                                                        childInternship: data.child[d].internship,
                                                        childName: data.child[d].navn,
                                                        // childNote: data.child[d].note,
                                                        childParent: data.child[d].parent,
                                                        // childTime: data.child[d].time,
                                                        count: 1
                                                    }
                                                }
                                                map.set(currKey, newObj);
                                            }
                                        })
                                    });
                                    
                                    var res = Array.from(map).map(e => e[1]);
                                    i++;

                                    var hash = Object.create(null);
                                    var keys = ['parent', 'checked'];
                                    var grouped = [];

                                    res.forEach(function (o) {
                                        var key = keys.map(function (k) { return o[k]; }).join('|');
                                        if (!hash[key]) {
                                            hash[key] = {};
                                            keys.forEach(function (k) { hash[key][k] = o[k]; });
                                            hash[key].children = [];
                                            grouped.push(hash[key]);
                                        }
                                        hash[key].children = hash[key].children.concat(o.childtest);
                                    });
                                    this.categories = grouped;

                                    // this.categories = grouped;
                                    // console.log(grouped['childtest']);
                                    
                                })
                                
                        }
                    }
                })
        })
    }

    nextPage() {
        this.navCtrl.push(EfaringsdetailjerPage);
    }

    closeModal() {
        this.view.dismiss();



    }


    toggleSection(i) {


        this.categories[i].open = !this.categories[i].open;

    }


    ionViewDidLoad() {
        // this.barChart = new Chart(this.barCanvas.nativeElement, {

        //     type: 'bar',
        //     data: {
        //         labels: ["1", "2", "3", "4", "5", "6"],
        //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //         borderColor: 'rgba(255, 99, 132, 0.2)',
        //         datasets: [{
        //             label: '# of days',
        //             data: [12, 19, 3, 5, 2, 3, 4, 7, 4, 2],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero: true
        //                 }
        //             }],
        //             xAxes: [{
        //                 gridLines: {
        //                     offsetGridLines: true
        //                 }
        //             }]
        //         }
        //     }

        // });





    }

    
    // removeDuplicates(myArr, prop) {
    //     return myArr.filter((obj, pos, arr) => {
    //         return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    //     });
    // }
    // compressArray(original) {

    //     var compressed = [];
    //     // make a copy of the input array
    //     var copy = original.slice(0);

    //     // first loop goes over every element
    //     for (var i = 0; i < original.length; i++) {

    //         var myCount = 0;
    //         // loop over every element in the copy and see if it's the same
    //         for (var w = 0; w < copy.length; w++) {
    //             if (original[i] == copy[w]) {
    //                 // increase amount of times duplicate is found
    //                 myCount++;
    //                 // sets item to undefined
    //                 delete copy[w];
    //             }
    //         }

    //         if (myCount > 0) {
    //             var a = new Object({
    //                 value : original[i],
    //                 count : myCount
    //             });
                
    //             compressed.push(a);
    //         }
    //     }

    //     return compressed;
    // };

    showModal(experienceId, experienceName) {
        const modal = this.modalCtrl.create(ExperienceModalPage, { experienceId: experienceId, experienceName: experienceName });
        modal.present();
    
      }
}
