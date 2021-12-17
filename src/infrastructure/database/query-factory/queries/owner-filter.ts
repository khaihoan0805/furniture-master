// import { Query } from "../index";


// export class OwnerFilter {
//   public static append(ctx: any, domain: string, query: Query) {
//     if (!ctx) {
//       throw Error('missing context');
//     }
//     if (!domain) {
//       throw Error('missing table name');
//     }
//     if (!query) {
//       throw Error('missing query');
//     }

//     const isLogin = ctx.user && ctx.user.id;
//     const isAdmin = ctx.user.isSuperAdmin || (ctx.account && ctx.account.type === AccountTypes.Admin);
//     const isSwitchedAccount = ctx.account && ctx.originalAccount && ctx.account.id !== ctx.originalAccount.id;

//     switch (domain) {
//       /**
//        * Business Domain
//        */
//       case 'user':
//         {
//           query.addCondition({
//             /* prevent include soft deleted item */
//             status: { $not: /*EntityStatuses.Deleted*/ 3 },
//           });

//           if (
//             /* when user logged in */
//             isLogin &&
//             /* when user is not an admin */
//             !isAdmin
//           ) {
//             // fixed: user override when update user by id
//             query.appendAnd('id', { id: ctx.user.id || 0 });
//           }

//           /**
//            * Other use case will not filter by id as:
//            * - user is super admin or admin
//            * - user not logged in ( use case generate token )
//            */
//         }
//         break;

//       case 'account':
//         {
//           query.addCondition({
//             status: { $not: EntityStatuses.Deleted },
//           });

//           const orCondition: any[] = [];

//           let _isAdmin = ctx.user.isSuperAdmin || (ctx.account && ctx.account.type === AccountTypes.Admin);
//           let accountId = ctx.account.id;

//           if (isSwitchedAccount) {
//             _isAdmin =
//               ctx.user.isSuperAdmin || (ctx.originalAccount && ctx.originalAccount.type === AccountTypes.Admin);
//             accountId = ctx.account.id;
//           }

//           if (isLogin && !_isAdmin) {
//             orCondition.push({ id: accountId });
//             orCondition.push({ parentId: accountId });
//           }

//           if (orCondition && orCondition.length) {
//             query.appendAnd('$or', { $or: orCondition });
//           }
//         }
//         break;

//       case 'company':
//         {
//           query.addCondition({
//             accountTypeId: 2 /* account type id of company */,
//             status: { $not: EntityStatuses.Deleted },
//           });

//           if (!isAdmin) {
//             query.appendAnd('id', { id: ctx.account.companyId || 0 });
//           }
//         }
//         break;

//       case 'brand':
//         {
//           query.addCondition({
//             accountTypeId: 3 /* account type id of brand */,
//             status: { $not: EntityStatuses.Deleted },
//           });

//           if (!isAdmin) {
//             if (ctx.account.brandId) {
//               query.appendAnd('id', { id: ctx.account.brandId || 0 });
//             } else {
//               query.appendAnd('parentId', { parentId: ctx.account.companyId || 0 });
//             }
//           }
//         }
//         break;

//       default:
//       // do nothing
//     }
//   }
// }
