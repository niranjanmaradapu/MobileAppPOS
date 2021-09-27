import React from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppRoute from '../Navigation/AppRoute';
import { openDatabase } from 'react-native-sqlite-storage';
import axios from 'axios';
import NewSaleService from './services/NewSaleService';
// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    // this.navigate = this.props.navigation.navigate;
    this.state = {
      getListOfBarcodes: []
    }
  }
  async componentDidMount() {
    Font.loadAsync({
      bold: require("./assets/fonts/ProductSans-Bold.ttf"),
      regular: require("./assets/fonts/ProductSans-Regular.ttf"),
      semibold: require("./assets/fonts/Metropolis-SemiBold.otf"),
    });

    
    //setInterval(() => {
      db.transaction(txn => {
        txn.executeSql(
          'DROP TABLE tbl_item',
          [],
          (sqlTxn, res) => {
            console.log(`delteed successfully`);
          },
          error => {
            console.log("error on adding category " + error.message);
          },
        );
      })

    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS tbl_item(item_id INTEGER PRIMARY KEY AUTOINCREMENT, barcode VARCHAR(20), itemDesc VARCHAR(20), qty INT(5), mrp INT(30), promoDisc INT(30), netAmount INT(30), salesMan INT(30), createdDate VARCHAR(255),lastModified VARCHAR(255))`,
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });


    axios.get(NewSaleService.getAllBarcodes()).then((res) => {
      if (res.data["result"]) {
        let len = res.data["result"].length;
        console.log("get products lenth" + len)
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            let item = res.data["result"][i]
            console.log(item)
            let barcode = String(item["barcode"])
            let itemDesc = String(item["itemDesc"])
            let qty = item["qty"]
            let mrp = item['mrp']
            let promoDisc = item['promoDisc']
            let netAmount = item['netAmount']
            let salesMan = item['salesMan']
            let createdDate = String(item['createdDate'])
            let lastModified = String(item['lastModified'])
            db.transaction(txn => {
              txn.executeSql(
                'INSERT INTO tbl_item ( barcode, itemDesc, qty, mrp, promoDisc, netAmount, salesMan, createdDate, lastModified) VALUES (?,?,?,?,?,?,?,?,?)',
                [barcode, itemDesc, qty, mrp, promoDisc, netAmount, salesMan, createdDate, lastModified],
                //[, String(getListOfBarcodes[0][0]["itemDesc"]), getListOfBarcodes[0][0]["qty"], , getListOfBarcodes[0][0]['promoDisc'], getListOfBarcodes[0][0]['netAmount'], getListOfBarcodes[0][0]['salesMan'], String(getListOfBarcodes[0][0]['createdDate']), String(getListOfBarcodes[0][0]['lastModified'])],
                (sqlTxn, res) => {

                  console.log(`added successfully`);
                  getProducts()
                },
                error => {
                  console.log("error on adding category " + error.message);
                },
              );

            });
          }
        }
      }
    });
  //}, 60000);

   

    const getProducts = () => {
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM tbl_item`,
          [],
          (sqlTxn, res) => {

            let len = res.rows.length;

            if (len > 0) {
              let results = [];
              for (let i = 0; i < len; i++) {
                let item = res.rows.item(i);
                results.push({ item });
              }
              console.log(JSON.stringify(results));

              setCategories(results);
            }
          },
          error => {
            console.log("error on getting categories " + error.message);
          },
        );
      });
    };
  }



  render() {
    return (
      <AppRoute />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




