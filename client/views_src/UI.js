
// -----------------------------------------------------------------------------
class AvatarIcon
{
  view(vnode)
  {
    const options = vnode.attrs || {};

    const selector = (options.iconIndex == options.selectedIndex)
      ? "avatarIconSelected"
      : "avatarIconNormal";

    const img_src = GetAvatarLoadUrlWithIndex(options.iconIndex);
    return <img class={selector} src={img_src} onclick={options.onclick}></img>
  }
};

// -----------------------------------------------------------------------------
class MenuPanelView
{
  view(vnode)
  {
    const options  = vnode.attrs    || {};
    const children = vnode.children || {};

    return <div class="menuPanel">
      <div class="menuPanelIconContainer">
        <AvatarIcon iconIndex={options.iconIndex}></AvatarIcon>
      </div>
      <div class="menuPanelCharmContainer">
        <img src="assets/ui_assets/popup_header.png"></img>
      </div>
      {children}
    </div>
  }
};
