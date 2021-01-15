import { portes, plakoto, fevga } from "olympus-bg";
import { Variant } from "./util";

export const boards = {
    [Variant.portes]: portes.Board,
    [Variant.plakoto]: plakoto.Board,
    [Variant.fevga]: fevga.Board,
};
