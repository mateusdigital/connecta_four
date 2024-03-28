//~---------------------------------------------------------------------------//
//                        _      _                 _   _                      //
//                    ___| |_ __| |_ __ ___   __ _| |_| |_                    //
//                   / __| __/ _` | '_ ` _ \ / _` | __| __|                   //
//                   \__ \ || (_| | | | | | | (_| | |_| |_                    //
//                   |___/\__\__,_|_| |_| |_|\__,_|\__|\__|                   //
//                                                                            //
//  File      : Utils.js                                                      //
//  Project   : mcow_js_core                                                  //
//  Date      : Feb 28, 2020                                                  //
//  License   : GPLv3                                                         //
//  Author    : stdmatt <stdmatt@pixelwizards.io>                             //
//  Copyright : stdmatt 2020                                                  //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//

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
