# build graph req -> dep and in_degree hash table
# build no_dep array
# track total_deps and remove edges
# check if removed_edges == total_deps
# O(v+e) time and space
from collections import defaultdict
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = defaultdict(list)
        in_degree = defaultdict(int)
        total_deps = 0
        for courses in prerequisites:
            course, pre_req = courses[0], courses[1]
            graph[pre_req].append(course)
            in_degree[course] += 1
            total_deps += 1
        no_dep_courses = [k for k in range(numCourses) if k not in in_degree]
        removed_edges = 0
        while len(no_dep_courses):
            current_course = no_dep_courses.pop()
            for next_course in graph[current_course]:
                in_degree[next_course] -= 1
                removed_edges += 1
                if in_degree[next_course] == 0:
                    no_dep_courses.append(next_course)
        return removed_edges == total_deps