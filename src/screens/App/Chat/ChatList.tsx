import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useFetchConversations } from '@/hooks/chat';
import { Conversation } from '@/types/chat';
import { APP_ROUTES, MainStackNavigationProp } from '@/types/routes';

import { ChatListSkeleton, ConversationItem, EmptyState } from './components';

type ChatTab = 'all' | 'unread';

const ChatList: React.FC = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const [activeTab, setActiveTab] = useState<ChatTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isManualRefresh, setIsManualRefresh] = useState(false);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFetchConversations();

  const currentUserId = data?.pages[0]?.currentUserId ?? '';

  const conversations = useMemo(() => {
    return data?.pages.flatMap(page => page.conversations) ?? [];
  }, [data]);

  const filteredConversations = useMemo(() => {
    let filtered = conversations;

    if (activeTab === 'unread') {
      filtered = conversations.filter(conv => {
        const isOwnMessage = conv.lastMessage.senderId === currentUserId;

        return !conv.lastMessage.isRead && !isOwnMessage;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(conv =>
        conv.otherParticipant.name.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [conversations, activeTab, currentUserId, searchQuery]);

  const handleConversationPress = useCallback(
    (conversation: Conversation) => {
      navigation.navigate(APP_ROUTES.CHAT_CONVERSATION, {
        conversationId: conversation.roomId,
        otherUserId: conversation.otherParticipant._id,
        userName: conversation.otherParticipant.name,
        userImage: conversation.otherParticipant.profileImage,
      });
    },
    [navigation],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(async () => {
    setIsManualRefresh(true);
    await refetch();
    setIsManualRefresh(false);
  }, [refetch]);

  const renderConversationItem = useCallback(
    ({ item }: { item: Conversation }) => (
      <ConversationItem
        conversation={item}
        currentUserId={currentUserId}
        onPress={handleConversationPress}
      />
    ),
    [currentUserId, handleConversationPress],
  );

  const renderEmptyList = useCallback(() => {
    if (isLoading) {
      return null;
    }

    let title = 'No conversations yet';
    if (searchQuery) {
      title = 'No results found';
    } else if (activeTab === 'unread') {
      title = 'No unread messages';
    }

    const subtitle =
      !searchQuery && activeTab === 'all'
        ? 'Start a conversation with someone!'
        : undefined;

    return <EmptyState title={title} subtitle={subtitle} />;
  }, [isLoading, searchQuery, activeTab]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) {
      return null;
    }

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color="#FFFFFF" size="small" />
      </View>
    );
  }, [isFetchingNextPage]);

  const keyExtractor = useCallback((item: Conversation) => item.roomId, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'all' && styles.activeTabText,
              ]}>
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'unread' && styles.activeTab]}
            onPress={() => setActiveTab('unread')}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'unread' && styles.activeTabText,
              ]}>
              Unread
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon
            name="search-outline"
            size={moderateScale(20)}
            color="#999999"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Loading State */}
        {isLoading ? <ChatListSkeleton count={8} /> : null}

        {/* Conversations List */}
        {!isLoading ? (
          <FlatList
            data={filteredConversations}
            renderItem={renderConversationItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={[
              styles.listContent,
              filteredConversations.length === 0 && styles.emptyListContent,
            ]}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={renderEmptyList}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={isManualRefresh}
                onRefresh={handleRefresh}
                tintColor="#FFFFFF"
              />
            }
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: moderateScale(20),
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(32),
    marginBottom: moderateScale(20),
    gap: moderateScale(32),
  },
  tab: {
    paddingBottom: moderateScale(8),
  },
  activeTab: {
    borderBottomWidth: moderateScale(2),
    borderBottomColor: '#FFFFFF',
  },
  tabText: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: '#999999',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: moderateScale(24),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    marginHorizontal: moderateScale(16),
    marginBottom: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInput: {
    flex: 1,
    marginLeft: moderateScale(12),
    fontSize: moderateScale(15),
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(20),
  },
  emptyListContent: {
    flex: 1,
  },
  footerLoader: {
    paddingVertical: moderateScale(20),
    alignItems: 'center',
  },
});

export default ChatList;
