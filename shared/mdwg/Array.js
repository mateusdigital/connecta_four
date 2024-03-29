//~---------------------------------------------------------------------------//
//                        _      _                 _   _                      //
//                    ___| |_ __| |_ __ ___   __ _| |_| |_                    //
//                   / __| __/ _` | '_ ` _ \ / _` | __| __|                   //
//                   \__ \ || (_| | | | | | | (_| | |_| |_                    //
//                   |___/\__\__,_|_| |_| |_|\__,_|\__|\__|                   //
//                                                                            //
//  File      : Array.js                                                      //
//  Project   : mcow_js_core                                                  //
//  Date      : Feb 28, 2020                                                  //
//  License   : GPLv3                                                         //
//  Author    : stdmatt <stdmatt@pixelwizards.io>                             //
//  Copyright : stdmatt 2020                                                  //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//

class Arr
{
    // -------------------------------------------------------------------------
    static Create(size, defaultValue = null)
    {
        let arr = new Array(size);
        arr.fill(defaultValue);
        return arr;
    }

    // -------------------------------------------------------------------------
    static Create2D(h, w, defaultValue = null)
    {
        let arr = [];
        for(let i = 0; i < h; ++i) {
            arr.push([]);
            for(let j = 0; j < w; ++j) {
                arr[i].push(defaultValue);
            }
        }
        return arr;
    }

    //------------------------------------------------------------------------------
    static IsEmpty(arr)
    {
        return arr.length == 0;
    }

    //------------------------------------------------------------------------------
    static IndexOf(arr, func)
    {
        // @TODO(stdmatt): use js stuff...
        for(let i = 0; i < arr.length; ++i) {
            if(func(arr[i])) {
                return i;
            }
        }
        return -1;
    }

    //------------------------------------------------------------------------------
    static FindIf(arr, func)
    {
        let r = arr.find(func);
        return r;
    }

    //------------------------------------------------------------------------------
    static Contains(arr, func)
    {
        let r = arr.find(func);
        if(r == undefined) {
            return false;
        }
        return true;
    }

    //------------------------------------------------------------------------------
    static RemoveFront(arr)
    {
        arr = arr.splice(0, 1);
    }

    //------------------------------------------------------------------------------
    static RemoveLast(arr)
    {
        arr = arr.splice(arr.length-1, 1);
    }

    //------------------------------------------------------------------------------
    static RemoveAt(arr, i)
    {
        arr = arr.splice(i, 1);
    }

    //------------------------------------------------------------------------------
    static Remove(arr, element)
    {
        arr = Arr.RemoveIf(arr, (other) => {
            return element == other;
        })
    }

    //------------------------------------------------------------------------------
    static RemoveIf(arr, pred)
    {
        for(let i = 0; i < arr.length; ++i) {
            if(pred(arr[i])) {
                Arr.RemoveAt(arr, i);
                return;
            }
        }
    }

    //------------------------------------------------------------------------------
    static PushFront(arr, e)
    {
        arr.unshift(e);
    }

    //------------------------------------------------------------------------------
    static PushBack(arr, e)
    {
        arr.push(e);
    }


    //------------------------------------------------------------------------------
    static PopBack(arr)
    {
        let e = Arr.GetBack(arr);
        arr = arr.splice(arr.length -1, 1);
        return e;
    }

    //------------------------------------------------------------------------------
    static PopFront(arr)
    {
        let e = Arr.GetFront(arr);
        arr = arr.splice(0, 1);
        return e;
    }

    // -------------------------------------------------------------------------
    static Get(arr, i)
    {
        if(i >= arr.length) {
            debugger;
        }

        if(i < 0) {
            i = (arr.length + i);
        }

        return arr[i];
    }

    // -------------------------------------------------------------------------
    static GetBack(arr)
    {
        if(Arr.IsEmpty(arr)) {
            return null;
        }
        return arr[arr.length-1];
    }

    //------------------------------------------------------------------------------
    static GetFront(arr)
    {
        if(Arr.IsEmpty(arr)) {
            return null;
        }
        return arr[0];
    }
}


// -----------------------------------------------------------------------------
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = Arr;
  }
