mutation createCollection($collection: CreateCollectionInput!) {
  createCollection(collection: $collection) {
    id
    name
    description
  }
}

mutation createGroup($group: CreateGroupInput!) {
  createGroup(group: $group) {
    id
    name
    description
  }
}

query getUser($userId: ID!) {
  user(id: $userId) {
    first_name
    last_name
  }
}

query getGroup($groupId: ID!) {
  group(id: $groupId) {
    name
    description
  }
}