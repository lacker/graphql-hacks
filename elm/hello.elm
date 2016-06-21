import Html exposing (button, br, div, text)
import Html.App exposing (beginnerProgram)
import Html.Events exposing (onClick)
import List exposing (head, tail)

main =
  beginnerProgram { model = ["sometimes"], view = view, update = update }

mbutton msg = button [ onClick msg ] [ text msg ]

view model = div [] [
              text (getstring model),
              br [] [],
              mbutton "fish",
              mbutton "buffalo",
              mbutton "undo"
             ]

getstring model =
    case model of
        [] -> "EMPTY"
        s :: _ -> s


update msg model =
    case msg of
        "undo" -> Maybe.withDefault ["oops"] (tail model)
        s -> ((getstring model) ++ " " ++ s) :: model

