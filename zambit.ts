// 여기에 코드를 추가하세요.

//% color=#222222 weight=110 icon="\uf121" block="zambit"
//% groups="['others', 'Fruits', 'Veggies']"

namespace zambit {
    //% block
    //% group="others"
    export function helloZambit() {
        basic.showString("Zambit")
    }

    //% block="helloZambitNum x = $x"
    //% group="others"
    export function helloZambitNum(x: number) {
        for (let i = 1; i <= x; i++) {
            basic.showString("Z" + i.toString())
        }
    }

    //% block
    //% group="Veggies"
    export function potato() {

    }

    //% block
    //% group="Veggies"
    export function bean() {

    }

    //% block
    //% group="Fruits"
    export function apple() {

    }

    //% block
    //% group="Fruits"
    export function banana() {

    }
}