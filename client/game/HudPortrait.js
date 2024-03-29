class HudPortrait
  extends PIXI.Container
{

  constructor()
  {
    super();

    this._bgSprite       = Sprite.Create(ASSETS_UI_ASSETS_POPUP_BASE);
    this._bgHeaderSprite = Sprite.Create(ASSETS_UI_ASSETS_POPUP_HEADER);
    this._charSprite     = Sprite.Create(ASSETS_CHARACTERS_CHARACTERS_0006);

    this.addChild(this._bgSprite);
    this.addChild(this._bgHeaderSprite);
    this.addChild(this._charSprite);

    this.scale.set(0.5);
  }
}