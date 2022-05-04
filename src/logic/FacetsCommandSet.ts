import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { IFacetsController } from './IFacetsController';

export class FacetsCommandSet extends CommandSet {
    private _logic: IFacetsController;

    constructor(logic: IFacetsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetFacetsByGroupCommand());
		this.addCommand(this.makeAddFacetCommand());
		this.addCommand(this.makeRemoveFacetCommand());
		this.addCommand(this.makeDeleteFacetsByGroupCommand());
		this.addCommand(this.makeClearCommand());
    }

	private makeGetFacetsByGroupCommand(): ICommand {
		return new Command(
			"get_facets_by_group",
			new ObjectSchema(true)
				.withRequiredProperty('group', TypeCode.String)
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let group = args.getAsNullableString("group");
				let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getFacetsByGroup(correlationId, group, paging);
            }
		);
	}

	private makeAddFacetCommand(): ICommand {
		return new Command(
			"add_facet",
			new ObjectSchema(true)
				.withRequiredProperty('group', TypeCode.String)
				.withRequiredProperty('name', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let group = args.getAsNullableString("group");
                let name = args.getAsNullableString("name");
				return await this._logic.addFacet(correlationId, group, name);
            }
		);
	}

	private makeRemoveFacetCommand(): ICommand {
		return new Command(
			"remove_facet",
			new ObjectSchema(true)
				.withRequiredProperty('group', TypeCode.String)
				.withRequiredProperty('name', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let group = args.getAsNullableString("group");
                let name = args.getAsNullableString("name");
				return await this._logic.removeFacet(correlationId, group, name);
            }
		);
	}

	private makeDeleteFacetsByGroupCommand(): ICommand {
		return new Command(
			"delete_facets_by_group",
			new ObjectSchema(true)
				.withRequiredProperty('group', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let group = args.getAsNullableString("group");
				return await this._logic.deleteFacetsByGroup(correlationId, group);
            }
		);
	}

	private makeClearCommand(): ICommand {
		return new Command(
			"clear",
			new ObjectSchema(true),
            async (correlationId: string, args: Parameters) => {
				return await this._logic.clear(correlationId);
            }
		);
	}

}