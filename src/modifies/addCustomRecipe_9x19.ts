import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {IHideoutProduction} from '@spt/models/eft/hideout/IHideoutProduction';
import idcalc from '../helpers/idcalc';

const newId: string = '6826581dd560f4c596bd7b00';

const stuffsTemplateArray:Array<ItemTpl> = [
  ItemTpl.AMMO_9X19_AP_63,ItemTpl.AMMO_9X19_PST,ItemTpl.AMMO_9X19_M882,ItemTpl.AMMO_9X19_GT,ItemTpl.AMMO_9X19_LUGER_CCI,
  ItemTpl.AMMO_9X19_PSO,ItemTpl.AMMO_9X19_QUAKEMAKER,ItemTpl.AMMO_9X19_RIP
];

export default function addCustomRecipe_9x19(logger: ILogger,tables: IDatabaseTables) {
  const productTemplate = tables.templates.items[ItemTpl.AMMO_9X19_PBP] || null;
  if(!productTemplate){
    logger.error('[SPTarkovAmmoCraft]：addCustomRecipe_9x19，Error：template AMMO_9X19_PBP not found');
    return;
  }
  const productionCount = productTemplate._props.StackMaxSize * 4;
  const totalValue = productTemplate._props.PenetrationPower * productTemplate._props.Damage * productionCount;
  for (const id of stuffsTemplateArray) {
    const template = tables.templates.items[id] || null;
    if(!template){continue;}
    const newRecipe:IHideoutProduction = {
      _id: idcalc(newId,stuffsTemplateArray.indexOf(id)+1),
      areaType: 5,
      requirements: [
        {
          areaType: 10,
          requiredLevel: 1,
          type: 'Area'
        },{
          templateId: ItemTpl.BARTER_TOOLSET,
          type: 'Tool'
        },{
          count: Math.round(productTemplate._props.PenetrationPower / 10),
          isEncoded: false,
          isFunctional: false,
          isSpawnedInSession: false,
          templateId: ItemTpl.BARTER_GUNPOWDER_KITE,
          type: 'Item'
        },{
          count: Math.round(totalValue / template._props.PenetrationPower / template._props.Damage),
          isEncoded: false,
          isFunctional: false,
          isSpawnedInSession: false,
          templateId: id,
          type: 'Item'
        }
      ],
      productionTime: 3600,
      endProduct: ItemTpl.AMMO_9X19_PBP,
      isEncoded:false,
      locked: false,
      needFuelForAllProductionTime: false,
      continuous: false,
      count: productionCount,
      productionLimitCount: 0,
      isCodeProduction: false,
    };
    tables.hideout.production.recipes.push(newRecipe);
    logger.debug('[SPTarkovAmmoCraft]：addCustomRecipe_9x19，ID：' + newRecipe._id);
  }

  logger.success('[SPTarkovAmmoCraft]：addCustomRecipe_9x19，ID：' + newId);
}
