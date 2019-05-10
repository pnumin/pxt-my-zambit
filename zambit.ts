// 여기에 코드를 추가하세요.

//% color=#222222 weight=110 icon="\uf121" block="zambit"
//% groups="['others', 'Fruits', 'Veggies']"

namespace zambit {
    //% block="zamPin x = $x"
    export function zamPin(x: number): number {
        if (x == 4) {
            pins.digitalWritePin(DigitalPin.P4, 1)
        }
        else if (x == 5) {
            pins.digitalWritePin(DigitalPin.P5, 1)
        }
        else if (x == 6) {
            pins.digitalWritePin(DigitalPin.P6, 1)
        }

        return x

    }
    //% block="zamPinCheck x = $x"
    export function zamPinCheck(x: number): boolean {
        if (x == 4 && pins.digitalReadPin(DigitalPin.P4)) {
            return true 
        }
        else if (x == 5 && pins.digitalReadPin(DigitalPin.P5)) {
            return true     
        }
        else if (x == 6 && pins.digitalReadPin(DigitalPin.P6)) {
            return true   
        }
        else return false


    }

    //% block
    export function helloZambit() {

        input.onButtonPressed(Button.A, function () {
            basic.showString("Zam")
        })

        input.onButtonPressed(Button.B, function () {
            basic.showString("bit")
        })

        input.onGesture(Gesture.Shake, function () {
            basic.showIcon(IconNames.Heart)
        })
    }

    //% block="helloZambitNum x = $x"
    export function helloZambitNum(x: number) {
        for (let i = 1; i <= x; i++) {
            basic.showString("Z" + i.toString())
        }
    }

}