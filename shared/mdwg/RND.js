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
//  File      : RND.js                                                        //
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
class RND
{
    // -------------------------------------------------------------------------
    static __Generator = null;

    // -------------------------------------------------------------------------
    static Seed(v)
    {
        RND.__Generator = (v != undefined && v != null)
            ? RND.__mulberry32(v)
            : RND.__mulberry32(Date.now());
    }

    // -------------------------------------------------------------------------
    static Number(m, M)
    {
        if(m == undefined) {
            m = 0; M = 1;
        } else if(M == undefined) {
            M = m; m = 0;
        }

        if(!RND.__Generator) {
            RND.Seed();
        }

        const v = RND.__Generator();
        return m + (v * (M - m));
    }

    // -------------------------------------------------------------------------
    static Int(m, M)
    {
        return Math.floor(RND.Number(m, M));
    }

    // -------------------------------------------------------------------------
    static Element(collection)
    {
        const i = RND.Int(0, collection.length);
        return collection[i];
    }


    // -------------------------------------------------------------------------
    static __mulberry32(a)
    {
        // Reference:
        //   https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
        return function() {
          var t = a += 0x6D2B79F5;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }

}

// -----------------------------------------------------------------------------
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = RND;
}
