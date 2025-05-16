import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {IHideoutProduction} from '@spt/models/eft/hideout/IHideoutProduction';
import idcalc from '../helpers/idcalc';

const newId: string = '68265bbd5d0bf9d4d1f56800';

const stuffsTemplateArray: Array<ItemTpl> = [
  ItemTpl.AMMO_762X25TT_PT,ItemTpl.AMMO_762X25TT_P,ItemTpl.AMMO_762X25TT_AKBS,ItemTpl.AMMO_762X25TT_FMJ43,ItemTpl.AMMO_762X25TT_LRN,
  ItemTpl.AMMO_762X25TT_LRNPC,ItemTpl.AMMO_9X19_QUAKEMAKER,ItemTpl.AMMO_9X19_RIP
];

export default function addCustomRecipe_762x25(logger: ILogger,tables: IDatabaseTables) {
  const productTemplate = tables.templates.items[ItemTpl.AMMO_762X25TT_PST] || null;
  if(!productTemplate) {
    logger.error('[SPTarkovAmmoCraft]：addCustomRecipe_762x25，Error：template AMMO_762X25TT_PST not found');
    return;
  }
  const productionCount = productTemplate._props.StackMaxSize * 4;
  const totalValue = productTemplate._props.PenetrationPower * productTemplate._props.Damage * productionCount;
  for(const id of stuffsTemplateArray) {
    const template = tables.templates.items[id] || null;
    if(!template) {continue;}
    const newRecipe: IHideoutProduction = {
      _id: idcalc(newId,stuffsTemplateArray.indexOf(id) + 1),
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
      endProduct: ItemTpl.AMMO_762X25TT_PST,
      isEncoded: false,
      locked: false,
      needFuelForAllProductionTime: false,
      continuous: false,
      count: productionCount,
      productionLimitCount: 0,
      isCodeProduction: false,
    };
    tables.hideout.production.recipes.push(newRecipe);
    logger.debug('[SPTarkovAmmoCraft]：addCustomRecipe_762x25，ID：' + newRecipe._id);
  }

  logger.success('[SPTarkovAmmoCraft]：addCustomRecipe_762x25，ID：' + newId);
}
