/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define(['N/search', 'N/cache', 'N/log'],
    function (search, cache, log) {

        const CS_CIT_RECORD_TYPE = 'customrecord_ps_cit';
        const CUSTRECORD_CIT_NETWORK_PARTNER_ID = 'custrecord_cit_network_partner_id';
        const CUSTRECORD_CIT_IBAN = 'custrecord_cit_iban';
        const CIT_NAME = 'name';

        const CS_CIT_CACHE_NAME_NETWORK_PARTNER = 'cit_cache_name_network_partner';
        const CS_CIT_CACHE_NAME_IBAN = 'cit_cache_name_iban';
        const CS_CIT_CACHE_NAME_CIT_NAME = 'cit_cache_name_cit_name';
        const CS_CIT_CACHE_KEY_NETWORK_PARTNER = 'cit_cache_key_network_partner';
        const CS_CIT_CACHE_KEY_IBAN = 'cit_cache_key_iban';
        const CS_CIT_CACHE_KEY_CIT_NAME = 'cit_cache_key_cit_name';

        function getInternalIdByNetworkPartnerShortName(networkPartnerShortName) {
            const citToInternalIdMap = loadAll(CS_CIT_CACHE_NAME_NETWORK_PARTNER, CS_CIT_CACHE_KEY_NETWORK_PARTNER, CUSTRECORD_CIT_NETWORK_PARTNER_ID);
            return citToInternalIdMap[networkPartnerShortName] || null;
        }

        function getInternalIdByIban(iban) {
            const citToInternalIdMap = loadAll(CS_CIT_CACHE_NAME_IBAN, CS_CIT_CACHE_KEY_IBAN, CUSTRECORD_CIT_IBAN);
            return citToInternalIdMap[iban] || null;
        }

        function getInternalIdByName(name) {
            const citToInternalIdMap = loadAll(CS_CIT_CACHE_NAME_CIT_NAME, CS_CIT_CACHE_KEY_CIT_NAME, CIT_NAME);
            return citToInternalIdMap[name] || null;
        }

        function loadAll(cacheName, cacheKey, columnName) {
            const citCache = cache.getCache({
                name: cacheName,
                scope: cache.Scope.PROTECTED
            });
            let CITs = citCache.get({ key: cacheKey });

            if (CITs) {
                CITs = JSON.parse(CITs);
                log.debug('CITs are loaded from cache', {cacheName, CITs});
                return CITs;
            } else {
                CITs = _loadAllFromDB(columnName);
                log.debug('CITs are loaded from DB', {cacheName, CITs});

                citCache.put({
                    key: cacheKey,
                    value: JSON.stringify(CITs),
                    ttl: 24 * 60 * 60 // Cache for 1 day
                });
                return CITs;
            }
        }


        function _loadAllFromDB(columnName) {
            const citMap = {};
            search.create({
                type: CS_CIT_RECORD_TYPE,
                filters: ['isinactive', 'is', 'F'],
                columns: [columnName]
            }).run().each(function (cit) {
                citMap[getColumnTextOrValue(cit, columnName)] = cit.id;
                return true;
            });
            return citMap;
        }

        function fetchListByPartnerId(id) {
            return search.create({
                type: CS_CIT_RECORD_TYPE,
                filters: [
                    ['isinactive', 'is', 'F'],
                    'and',
                    ['custrecord_cit_network_partner_id', 'is', id]
                ]
            });
        }

        function getColumnTextOrValue(cit, columnName) {
            if (columnName === 'custrecord_cit_network_partner_id') {
                return cit.getText(columnName)
            } else {
                return cit.getValue(columnName)
            }
        }

        return {
            loadAll,
            getInternalIdByNetworkPartnerShortName,
            getInternalIdByIban,
            getInternalIdByName,
            fetchListByPartnerId
        };
    })
