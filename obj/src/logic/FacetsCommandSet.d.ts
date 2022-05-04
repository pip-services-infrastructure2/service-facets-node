import { CommandSet } from 'pip-services3-commons-nodex';
import { IFacetsController } from './IFacetsController';
export declare class FacetsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IFacetsController);
    private makeGetFacetsByGroupCommand;
    private makeAddFacetCommand;
    private makeRemoveFacetCommand;
    private makeDeleteFacetsByGroupCommand;
    private makeClearCommand;
}
