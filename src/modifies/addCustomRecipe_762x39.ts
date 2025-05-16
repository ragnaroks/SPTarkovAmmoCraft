import {ItemTpl} from '@spt/models/enums/ItemTpl';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import {ILogger} from '@spt/models/spt/utils/ILogger';
import {IHideoutProduction} from '@spt/models/eft/hideout/IHideoutProduction';
import idcalc from '../helpers/idcalc';

const newId: string = '682667627e76a73d20b85300';

const stuffsTemplateArray:Array<ItemTpl> = [
  ItemTpl.AMMO_762X39_BP,ItemTpl.AMMO_762X39_PP,ItemTpl.AMMO_762X39_PS,ItemTpl.AMMO_762X39_T45M1,
  ItemTpl.AMMO_762X39_US,ItemTpl.AMMO_762X39_FMJ,ItemTpl.AMMO_762X39_SP,ItemTpl.AMMO_762X39_HP
];

export default function addCustomRecipe_762x39(logger: ILogger,tables: IDatabaseTables) {
  const productTemplate = tables.templates.items[ItemTpl.AMMO_762X39_MAI_AP] || null;
  if(!productTemplate){
    logger.error('[SPTarkovAmmoCraft]：addCustomRecipe_762x39，Error：template AMMO_762X39_MAI_AP not found');
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
          templateId: ItemTpl.BARTER_GUNPOWDER_HAWK,
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
      endProduct: ItemTpl.AMMO_762X39_MAI_AP,
      isEncoded:false,
      locked: false,
      needFuelForAllProductionTime: false,
      continuous: false,
      count: productionCount,
      productionLimitCount: 0,
      isCodeProduction: false,
    };
    tables.hideout.production.recipes.push(newRecipe);
    logger.debug('[SPTarkovAmmoCraft]：addCustomRecipe_762x39，ID：' + newRecipe._id);
  }

  logger.success('[SPTarkovAmmoCraft]：addCustomRecipe_762x39，ID：' + newId);
}
