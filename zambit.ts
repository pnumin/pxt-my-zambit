// 여기에 코드를 추가하세요.

//% color=#222222 weight=110 icon="\uf121" block="zambit"
namespace zambit {
    //% block
    export function helloZambit() {
        basic.showString("Zambit")
    }

    //% block="helloZambitNum x = $x"
    export function helloZambitNum(x: number) {
        for (let i = 1; i <= x; i++) {
            basic.showString("Z" + i.toString())
        }
    }

    /**
     * Render a boolean as a down/up toggle
     */
    //% block="$down"
    //% down.shadow="toggleDownUp"
    export function downUp(down: boolean): boolean {
        return down;
    }
    
    /**
     * Render a boolean as an up/down toggle
     */
    //% block="$up"
    //% up.shadow="toggleUpDown"
    export function upDown(up: boolean): boolean {
        return up;
    }
}