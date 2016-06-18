import Html exposing (button, br, div, text)
import Html.App exposing (beginnerProgram)
import Html.Events exposing (onClick)

main =
  beginnerProgram { model = "sometimes", view = view, update = update }

mbutton msg = button [ onClick msg ] [ text msg ]

view model = div [] [
              text (toString model),
              br [] [],
              mbutton "fish",
              mbutton "buffalo"
             ]


update msg model =
    model ++ " " ++ msg
