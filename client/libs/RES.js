
let _RESOURCES = null;

class RES
{
    // -------------------------------------------------------------------------
    static async LoadResources(...args)
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

        _RESOURCES = await PIXI.Assets.load(expanded_args);
    }

    // -------------------------------------------------------------------------
    static GetTexture(name)
    {
        const resource = _RESOURCES[name];
        if(!resource) {
            console.log(`Can't find texture - Name:(", name, ")`);
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
