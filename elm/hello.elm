import Html exposing (button, div, text)
import Html.App exposing (beginnerProgram)
import Html.Events exposing (onClick)

main =
  beginnerProgram { model = "world", view = view, update = update }

view model = div [] [
              text "hello",
              button [ onClick "fish" ] [ text (toString model) ]
             ]


update msg model =
    msg ++ " " ++ model
