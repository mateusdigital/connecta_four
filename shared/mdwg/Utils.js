//~---------------------------------------------------------------------------//
//                               *       +                                    //
//                         '                  |                               //
//                     ()    .-.,="``"=.    - o -                             //
//                           '=/_       \     |                               //
//                        *   |  '=._    |                                    //
//                             \     `=./`,        '                          //
//                          .   '=.__.=' `='      *                           //
//                 +                         +                                //
//                      O      *        '       .                             //
//                                                                            //
//  File      : Utils.js                                                      //
//  Project   : mdwg                                                          //
//  Date      : Feb 28, 2020                                                  //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//

// -----------------------------------------------------------------------------
class Utils
{
    //--------------------------------------------------------------------------
    static AddRuntimeProperty(obj, propName, value)
    {
        const full_prop_name = String_Cat("rtvar_", propName);
        obj[full_prop_name] = value;
    }

    //--------------------------------------------------------------------------
    static UniqueId()
    {
        if(this.s_unique_id == undefined) {
            this.s_unique_id = 0;
        }
        return this.s_unique_id++;
    }

    //--------------------------------------------------------------------------
    static IsNullOrUndefined(v)
    {
        return v == null || v == undefined;
    }
}

// -----------------------------------------------------------------------------
function Clamp(value, min, max)
{
    if(value < min) {
        return min;
    }
    else if(value > max) {
        return max;
    }
    return value;
}