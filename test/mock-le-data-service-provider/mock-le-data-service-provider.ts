/// <reference path="../../node_modules/ts-promise/dist/ts-promise.d.ts" />
import Promise from "ts-promise";

import LeDataServiceProvider from "../../src/le-data-service-provider.ts";

export class MockLeDataServiceProvider implements LeDataServiceProvider {
  private remoteStoredData: Object;
  constructor(){
    this.remoteStoredData = {};
  }
  dataExists(location:string): Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
      this.fetchData(location).then((fetchedData)=>{
        resolve(!!fetchedData);
      }, ()=>{
        resolve(false);
      });
    });
  }

  fetchData(location:string): Promise<any> {
    var locationArray: string[] = location.split('/');
    var dataToReturn = this.remoteStoredData;
    for(var i = 0; i < locationArray.length; i += 1) {
      var sublocation = locationArray[i];
      if (dataToReturn[sublocation]) {
        dataToReturn = dataToReturn[sublocation];
      } else {
        return Promise.reject(new Error('data did not exist remotely'));
      }
    }
    return Promise.resolve(dataToReturn);
  }

  saveData(location:string, data:any): Promise<void>{
    var locationArray: string[] = location.split('/');
    var locationToSaveAt = this.remoteStoredData;
    for(var i = 0; i < locationArray.length; i += 1) {
      var sublocation = locationArray[i];
      if (!locationToSaveAt[sublocation]) {
        locationToSaveAt[sublocation] = {}
      }
      locationToSaveAt = locationToSaveAt[sublocation];
    }
    locationToSaveAt = data;
    return Promise.resolve();
  }

  deleteData(location:string): Promise<void>{
    var locationArray: string[] = location.split('/');
    var fieldToDelete = locationArray[locationArray.length -1];
    var locationToDeleteAt = this.remoteStoredData;
    for(var i = 0; i < locationArray.length -1; i += 1) {
      var sublocation = locationArray[i];
      if (!locationToDeleteAt[sublocation]) {
        return Promise.reject(new Error('location to data to delete does not exist'));
      }
      locationToDeleteAt = locationToDeleteAt[sublocation];
    }
    if(!locationToDeleteAt[fieldToDelete]) {
      return Promise.reject(new Error('the field '+ fieldToDelete + ' does not exist'));
    }
    delete locationToDeleteAt[fieldToDelete];
    return Promise.resolve();
  }
}

export default MockLeDataServiceProvider;