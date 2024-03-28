//----------------------------------------------------------------------------//
// Constants                                                                  //
//----------------------------------------------------------------------------//
//------------------------------------------------------------------------------
APPLICATION_MAX_DELTA_TIME = 1/30;

//----------------------------------------------------------------------------//
// Variables                                                                  //
//----------------------------------------------------------------------------//
//------------------------------------------------------------------------------
let g_App = null;


// -----------------------------------------------------------------------------
class Application
{
    static Total_Time  = 0;
    static Delta_Time  = 0;
    static SceneManager = null;

    // -------------------------------------------------------------------------
    static PixiApp()
    {
        return g_App;
    }

    // -------------------------------------------------------------------------
    static async Create(options)
    {
        const container = options.canvasContainer || document.body;

        g_App = new PIXI.Application();
        await g_App.init(options);

        container.appendChild(g_App.canvas);

        Application.SceneManager = new SceneManager();
    }

    // -------------------------------------------------------------------------
    static Start(gameLoopCallback)
    {
        g_App.ticker.add(
            delta => {
                let dt = g_App.ticker.deltaMS / 1000;
                if(dt > APPLICATION_MAX_DELTA_TIME) {
                    dt = APPLICATION_MAX_DELTA_TIME;
                }

                Application.Delta_Time  = dt;
                Application.Total_Time += dt;

                gameLoopCallback(dt);

                Application.SceneManager.Update(dt);

                // Tween_Update(dt);
                // Input_Update();
            }
        );
    }
}
