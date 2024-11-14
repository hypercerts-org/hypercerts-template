import { ResultOf, graphql } from "gql.tada";

export const getHypercertsByHypercertIdQuery = graphql(`
  query GetHypercertByHypercertId($hypercert_id: String!) {
    hypercerts(where: { hypercert_id: { eq: $hypercert_id } }) {
      data {
        creator_address
        hypercert_id
        units
        uri
        contract {
          chain_id
        }
        orders {
          totalUnitsForSale
        }
        metadata {
          allow_list_uri
          contributors
          external_url
          description
          impact_scope
          work_timeframe_from
          work_timeframe_to
          work_scope
          name
          properties
        }
      }
    }
  }
`);

export type GetHypercertsByHypercertId = ResultOf<typeof getHypercertsByHypercertIdQuery>;

export const hypercertsByCreatorQuery = graphql(`
  query GetHypercertsByCreator($address: String!) {
    hypercerts(
      sort: { by: { attestations_count: descending } }
      where: { creator_address: { eq: $address } }
    ) {
      count
      data {
				id
        hypercert_id
        units
        uri
        creator_address
        contract {
          chain_id
        }
        metadata {
          id
          name
          description
          external_url
          work_scope
          contributors
          work_timeframe_from
          work_timeframe_to
          properties
        }
      }
    }
  }
`);

export type HypercertsByCreatorQuery = ResultOf<typeof hypercertsByCreatorQuery>;

export const getFractionsByOwnerQuery = graphql(`
  query GetFractionsByOwner($address: String!) {
    fractions(where: { owner_address: { eq: $address } }) {
      count
      data {
        id
        fraction_id
        hypercert_id
        owner_address
        units
        metadata {
          id
          name
          description
          external_url
          work_scope
          contributors
          work_timeframe_from
          work_timeframe_to
          properties
        }
      }
    }
  }
`);

export type GetFractionsByOwner = ResultOf<typeof getFractionsByOwnerQuery>;

export const getHyperboardsByAdminQuery = graphql(
    `
        query GetHyperboardsByAdmin($admin_id: String!) {
            hyperboards(where: {admin_id: {eq: $admin_id}}) {
                data {
                    sections {
                        data {
                            entries {
                                id
                            }
                        }
                    }
                    id
                }
            }
        }`
)

export const getHyperboardsByIdQuery = graphql(
        `
        query GetHyperboardsById($id: UUID!) {
            hyperboards(where: {id: {eq: $id}}) {
                data {
                    sections {
                        data {
                            entries {
                                id
                            }
                        }
                    }
                    id
                }
            }
        }`
)
