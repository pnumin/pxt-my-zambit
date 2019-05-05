// 여기에 코드를 추가하세요.

//% color=#222222 weight=110 icon="\uf121" block="zambit"
namespace zambit {
    //% block
    export function helloZambit() {
        basic.showString("Zambit")
    }

    //% block="helloZambit x = $x text = $text"
    export function helloZambitNum(x: number) {
        for (let i = 1; i <= x; i++) {
            basic.showString("Zambit" + i.toString())
        }
    }

}