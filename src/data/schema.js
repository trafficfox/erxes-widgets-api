export const types = `
  scalar Date
  scalar JSON

  type Company {
    _id: String!
    name: String
    size: Int
    website: String
    industry: String
    plan: String
    lastSeenAt: Date
    sessionCount: Int
    tagIds: [String],
  }

  type UserDetails {
    avatar: String
    fullName: String
  }

  type User {
    _id: String!
    details: UserDetails
  }

  type EngageData {
    messageId: String
    brandId: String
    content: String
    fromUserId: String
    fromUser: User
    kind: String
    sentAs: String
  }

  input FieldValueInput {
    _id: String!
    type: String
    validation: String
    text: String
    value: String
  }

  type Integration {
    _id: String!
    uiOptions: JSON
    messengerData: JSON
  }

  type Conversation {
    _id: String!
    customerId: String!
    integrationId: String!
    status: String!
    content: String
    createdAt: Date
    participatedUsers: [User]
    readUserIds: [String]

    messages: [ConversationMessage]
  }

  type ConversationMessage {
    _id: String!
    conversationId: String!
    customerId: String
    user: User
    content: String
    createdAt: Date
    attachments: [JSON]
    internal: Boolean
    engageData: EngageData
  }

  type Field {
    _id: String
    formId: String
    type: String
    check: String
    text: String
    description: String
    options: [String]
    isRequired: Boolean
    name: String
    validation: String
    order: Int
  }

  type Form {
    title: String
    fields: [Field]
  }

  type MessengerConnectResponse {
    integrationId: String
    uiOptions: JSON
    messengerData: JSON
    customerId: String
  }

  type EndConversationResponse {
    customerId: String!
  }

  type FormConnectResponse {
    integrationId: String!
    integrationName: String!
    formId: String!
    formData: JSON!
  }

  type SaveFormResponse {
    status: String!
    errors: [Error]
    messageId: String
  }

  type Error {
    fieldId: String
    code: String
    text: String
  }

  type KnowledgeBaseArticle {
    _id: String
    title: String
    summary: String
    content: String
    createdBy: String
    createdDate: Date
    modifiedBy: String
    modifiedDate: Date
    author: User
  }

  type KnowledgeBaseCategory {
    _id: String
    title: String
    description: String
    articles: [KnowledgeBaseArticle]
    numOfArticles: Int
    authors: [User]
    icon: String
  }

  type KnowledgeBaseTopic {
    _id: String
    title: String
    description: String
    categories: [KnowledgeBaseCategory]
  }

  type KnowledgeBaseLoader {
    loadType: String
  }
`;

export const queries = `
  type Query {
    conversations(integrationId: String!, customerId: String!): [Conversation]
    conversationDetail(_id: String!): Conversation
    getMessengerIntegration(brandCode: String!): Integration
    lastUnreadMessage(integrationId: String!, customerId: String!): ConversationMessage
    totalUnreadCount(integrationId: String!, customerId: String!): Int
    messages(conversationId: String): [ConversationMessage]
    unreadCount(conversationId: String): Int
    conversationLastStaff(_id: String): User
    isMessengerOnline(integrationId: String!): Boolean
    form(formId: String): Form
    knowledgeBaseTopicsDetail(topicId: String!) : KnowledgeBaseTopic
    knowledgeBaseCategoriesDetail(categoryId: String!) : KnowledgeBaseCategory
    knowledgeBaseArticles(topicId: String!, searchString: String) : [KnowledgeBaseArticle]
    knowledgeBaseLoader(topicId: String!) : KnowledgeBaseLoader
  }
`;

export const mutations = `
  type Mutation {
    endConversation(
      brandCode: String!,
      browserInfo: JSON!,
      data: JSON
    ): EndConversationResponse

    messengerConnect(
      brandCode: String!,
      name: String,
      email: String,
      phone: String,
      isUser: Boolean,

      browserInfo: JSON!,
      companyData: JSON,
      data: JSON,

      cachedCustomerId: String
    ): MessengerConnectResponse

    insertMessage(
      integrationId: String!,
      customerId: String!,
      conversationId: String,
      message: String,
      attachments: [JSON]
    ): ConversationMessage

    readConversationMessages(conversationId: String): String
    readEngageMessage(messageId: String!, customerId: String!): String
    saveCustomerGetNotified(customerId: String!, type: String!, value: String!): String
    formConnect(brandCode: String!, formCode: String!): FormConnectResponse

    saveForm(
      integrationId: String!,
      formId: String!,
      submissions: [FieldValueInput]
      browserInfo: JSON!,
    ): SaveFormResponse

    sendEmail(toEmails: [String], fromEmail: String, title: String, content: String): String
  }
`;
