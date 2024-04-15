import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { IoIosClose } from "react-icons/io";

const Draws = () => {
    const [teams, setTeams] = useState <string[]> ([]);
    const [team, setTeam] = useState <string> ('');
    const [groups, setgroups] = useState <string> ('');
    const [custom, setCustom] = useState <string> ('');
    const [lots, setLots] = useState <string[][]> ();
    const [selected, setSelected] = useState <number> (0);

	const updateGroup = (event: ChangeEvent<HTMLInputElement>) => {
		const numericValue = event.target.value === "" ? "" : Number(event.target.value) < 0 ? "0" : event.target.value;
        setgroups(numericValue);
    }

	const updateCustom = (event: ChangeEvent<HTMLInputElement>) => {
		const numericValue = event.target.value === "" ? "" : Number(event.target.value) < 0 ? "0" : event.target.value;
        setCustom(numericValue);
    }

    const saveTeam = () => {
        setTeams((prev) => [ ...prev, team ]);
        setTeam('');
    }

    const createKnockoutMatches = () => {
        setSelected(1);
        let matches = [];
        for (let i = 0; i < teams.length; i += 2) {
            matches.push(`${teams[i]} vs ${teams[i+1]}`);
        }
        return [matches];
    };

    const generateRoundRobinMatches = (teams: string[]) => {
        let matches = [];
        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                matches.push(`${teams[i]} vs ${teams[j]}`);
            }
        }
        return matches;
    };

    const createRoundRobinMatches = () => {
        setSelected(2);
        const teamsPerGroup = Math.ceil(teams.length / Number(groups));
        let groupMatches = [];
        for (let i = 0; i < Number(groups); i++) {
            const groupTeams = teams.slice(i * teamsPerGroup, (i + 1) * teamsPerGroup);
            const matches = generateRoundRobinMatches(groupTeams);
            groupMatches.push(matches);
        }
        return groupMatches;
    };

    const createCustomRoundRobinMatches = () => {
        setSelected(3);
        const teamsPerGroup = Math.ceil(teams.length / Number(groups));
        if (Number(custom) < 1 || teamsPerGroup - Number(custom) < 1) {
            return []
        }
        let groupMatches = [];
        for (let i = 0; i < Number(groups); i++) {
            const groupTeams = teams.slice(i * teamsPerGroup, (i + 1) * teamsPerGroup);
            const matches = scheduleCustomRoundRobinMatches(groupTeams);
            groupMatches.push(matches);
        }
        return groupMatches;
    };
    
    const scheduleCustomRoundRobinMatches = (groupTeams: string[]) => {
        let heap: [number, string][] = [];
        let store: Record<string, Set<string>> = {};
        groupTeams.forEach(team => {
            store[team] = new Set();
            heap.push([0, team]);
        });
        let matches: string[] = [];
        groupTeams.forEach(team => {
            let temp: [number, string][] = [];
            let remain = Number(custom) - store[team].size;
            let found = false;
            while (remain > 0) {
                if (heap.length === 0) {
                    return []
                }
                let [xgames, xteam] = heap.shift()!;
                if (xteam === team || store[team].has(xteam)) {
                    if (xteam === team) {
                        found = true;
                    }
                    temp.push([xgames, xteam]);
                    continue;
                }
                store[team].add(xteam);
                store[xteam].add(team);
                matches.push(`${team} vs ${xteam}`);
                temp.push([xgames + 1, xteam]);
                remain--;
            }
            while (!found) {
                let [xgames, xteam] = heap.shift()!;
                temp.push([xgames, xteam]);
                if (xteam === team) {
                    found = true;
                }
            }
            temp.forEach(item => {
                let [xgames, xteam] = item;
                if (xteam === team) {
                    heap.push([Number(custom), team]);
                } else {
                    heap.push([xgames, xteam]);
                }
            });
            heap.sort((a, b) => a[0] - b[0]);
        });
        return matches;
    };
    
    const addRandomTeams = (numberOfTeams: number) => {
        const newTeams = Array.from({ length:numberOfTeams }, (_, i) => `Team ${i + 1}`);
        setTeams(newTeams);
    }

    return (
        <Flex direction={"column"} gap={"40px"} width={"100%"} alignItems={"center"}>
            <Flex gap={"30px"}>
                <Input width={"200px"} name="team" value={team} onChange={(event: ChangeEvent<HTMLInputElement>) => setTeam(event.target.value)}/>
                <Button size={{ base: "sm", md: "md"}} isDisabled={team === ""} onClick={saveTeam}>Add Team</Button>
            </Flex>
            {teams.length === 0 && <Flex gap={"7px"}>
                <Button size={{ base: "sm", md: "md"}} onClick={() => addRandomTeams(10)}>Add 10 Teams</Button>
                <Button size={{ base: "sm", md: "md"}} onClick={() => addRandomTeams(16)}>Add 16 Teams</Button>
                <Button size={{ base: "sm", md: "md"}} onClick={() => addRandomTeams(20)}>Add 20 Teams</Button>
            </Flex>}
            {teams.length > 0 && <Flex gap={"7px"} maxWidth={{base:"90%", md: "50%"}} wrap={"wrap"} justifyContent={"center"}>
                {teams.map((team, index) => (
                    <Button size={{ base: "sm", md: "md"}} key={index} onClick={() => setTeams(prev => prev.filter(t => t !== team))}>{team} <IoIosClose/></Button>
                ))}
                <Button size={{ base: "sm", md: "md"}} colorScheme='red' onClick={() => {setTeams([]); setgroups(''); setCustom(''); setLots([]); setSelected(0)}}>Clear</Button>
            </Flex>}
            <Heading size={{base: "sm", lg: "lg"}}>TOTAL TEAMS : { teams.length }</Heading>
            <Flex gap={"10px"} alignItems={"center"}>
                <Text>Groups: </Text>
                <Input variant="flushed" type='number' pl={3} width={"50px"} name="groups" value={groups} onChange={updateGroup}/>
                <Text ml={2}>Custom RR Games: </Text>
                <Input variant="flushed" type='number' pl={3} width={"50px"} name="custom" value={custom} onChange={updateCustom}/>
            </Flex>
            <Flex gap={"20px"} wrap={"wrap"} justifyContent={"center"}>
                <Button bgColor={selected === 1 ? "steelblue" : ""} size={{ base: "sm", md: "md"}} _hover={{bgColor: "steelblue"}}
                    color={selected === 1 ? "white" : ""} isDisabled={teams.length === 0} onClick={() => setLots(createKnockoutMatches())}>Create Knockout Matches</Button>
                <Button bgColor={selected === 2 ? "steelblue" : ""} size={{ base: "sm", md: "md"}} _hover={{bgColor: "steelblue"}}
                    color={selected === 2 ? "white" : ""} isDisabled={teams.length === 0} onClick={() => setLots(createRoundRobinMatches())}>Create Round Robin Matches</Button>
                <Button bgColor={selected === 3 ? "steelblue" : ""} size={{ base: "sm", md: "md"}} _hover={{bgColor: "steelblue"}}
                    color={selected === 3 ? "white" : ""} isDisabled={teams.length === 0} onClick={() => setLots(createCustomRoundRobinMatches())}>Create Custom Round Robin Matches</Button>
            </Flex>
            {teams.length > 0 && lots && lots.length > 0 && <Flex gap={"7px"} bgColor="whitesmoke" rounded={"md"} p={{base: 5, lg: 10}} shadow={"sm"}
                maxWidth={{base:"90%", md: "60%"}} wrap={"wrap"}>
                {lots.map((lot, ind) => (
                    <Flex gap={"7px"} key={ind} wrap={"wrap"} alignItems={"center"} justifyContent={"center"}>
                        {lots.length > 1 && <Text fontWeight={"bold"} mr={3}>Group {ind + 1}</Text>}
                        {lot.map((match, index) => (
                            <Flex key={index} border={"1px solid silver"} px={6} py={1} rounded={"md"}>{match}</Flex>
                        ))}
                    </Flex>
                ))}
            </Flex>}
        </Flex>
    )
}

export default Draws;