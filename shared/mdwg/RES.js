
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
//  File      : RES.js                                                        //
//  Project   : mdwg                                                          //
//  Date      : 2024-03-29                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//

// -----------------------------------------------------------------------------
class RES
{
    // -------------------------------------------------------------------------
    static async LoadResourcesWithCallback(callback,...args)
    {
      let expanded_args = [];
      for(let i = 0; i < args.length; ++i) {
          const curr_arg = args[i];
          if(Array.isArray(curr_arg)) {
              expanded_args = expanded_args.concat(curr_arg);
          } else {
              expanded_args.push(curr_arg);
          }
      }

      PIXI.Assets
        .load(expanded_args)
        .then((loaded_resources) => {
          RES._RESOURCES = loaded_resources;
          callback();
        });
    }

    // -------------------------------------------------------------------------
    static GetTexture(name)
    {
        const resource = RES._RESOURCES[name];
        if(!resource) {
            console.error(`Can't find data - Name:(${name})`);
            debugger;
        }

        return resource;
    }
}

//----------------------------------------------------------------------------//
// Sprite                                                                     //
//----------------------------------------------------------------------------//
class Sprite
{
    // --------------------------------------------------------------------------
    static Create(textureName)
    {
        const texture = RES.GetTexture(textureName);
        if(!texture) {
            console.error(`Can't find data - Name:(${textureName})`);
            debugger;
        }
        return new PIXI.Sprite(texture);
    }

    // -------------------------------------------------------------------------
    static CreateWithTexture(texture)
    {
        return new PIXI.Sprite(texture);
    }

    // -------------------------------------------------------------------------
    static White(width, height)
    {
        const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        if(width && height) {
            sprite.width  = width;
            sprite.height = height;
        }

        return sprite;
    }
}
