import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("cart.db")

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists cart (id integer primary key not null, product json not null, product_id text not null, uid text not null);",
                [],
                () => resolve(),
                (_, err) => reject(err)
            )
        })
    })
    return promise
}

export const insertProduct = (product, productId, uid) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "insert into cart (product, product_id, uid) VALUES (?, ?, ?);",
                [product, productId, uid],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            )
        })
    })
    return promise
}

export const fetchCart = (uid) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM cart WHERE uid = '${uid}'`,
                [],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            )
        })
    })
    return promise
}

export const deleteProduct = (id, uid) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM cart WHERE product_id = '${id}' and uid = '${uid}'`,
                [],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            )
        })
    })
    return promise
}

export const isInCart = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM cart WHERE product_id = '${id}'`,
                [],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            )
        })
    })
    return promise
}

export const updateProduct = (product, id, uid) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE cart SET product = '${product}' WHERE product_id = '${id}' and uid = '${uid}'`,
                [],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            )
        })
    })
    return promise
}