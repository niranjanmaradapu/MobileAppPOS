
import React from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppRoute from '../Navigation/AppRoute';
import { openDatabase } from 'react-native-sqlite-storage';
// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });

export default class App extends React.Component {
  async componentDidMount() {
    Font.loadAsync({
      bold: require("./assets/fonts/Metropolis-Bold.otf"),
      regular: require("./assets/fonts/Metropolis-Regular.otf"),
      semibold: require("./assets/fonts/Metropolis-SemiBold.otf"),
    });

    //setInterval(() => {
      // db.transaction(txn => {
      //   txn.executeSql(
      //     'DROP TABLE tbl_item',
      //     [],
      //     (sqlTxn, res) => {
      //       console.log(`delteed successfully`);
      //     },
      //     error => {
      //       console.log("error on adding category " + error.message);
      //     },
      //   );
      // })

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

        db.transaction(txn => {
          txn.executeSql(
            'INSERT INTO tbl_item ( barcode, itemDesc, qty, mrp, promoDisc, netAmount, salesMan, createdDate, lastModified) VALUES (?,?,?,?,?,?,?,?,?)',
            ["BAR1", "Dress", 3, 1230, 400, 830, 5218, "2021-09-01T18:52:42.212074", "2021-09-01T18:53:04.270367"],
            (sqlTxn, res) => {
              console.log(`added successfully`);
            },
            error => {
              console.log("error on adding category " + error.message);
            },
          );
        });
      //}, 100)

      

      
    // const getProducts = () => {
    //   db.transaction(txn => {
    //     txn.executeSql(
    //       `SELECT * FROM tbl_item`,
    //       [],
    //       (sqlTxn, res) => {

    //         let len = res.rows.length;

    //         if (len > 0) {
    //           let results = [];
    //           for (let i = 0; i < len; i++) {
    //             let item = res.rows.item(i);
    //             results.push({ item });
    //           }
    //           console.log(JSON.stringify(results));

    //           setCategories(results);
    //         }
    //       },
    //       error => {
    //         console.log("error on getting categories " + error.message);
    //       },
    //     );
    //   });
    // };
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







