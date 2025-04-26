"use client";

import React, { useState, useEffect } from 'react';
import styles from './IncidentSection.module.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const IncidentSection = () => {
    const [mounted, setMounted] = useState(false);
    const [incidents, setIncidents] = useState([
        { 
            id: 1, 
            title: "Biased Recommendation Algorithm", 
            description: "Algorithm consistently favored certain demographics over others in job recommendations, leading to potential discrimination issues. The system showed a 15% bias towards male candidates in technical roles.", 
            severity: "Medium",
            reported_at: "2025-03-15T10:00:00Z" 
        },
        { 
            id: 2, 
            title: "LLM Hallucination in Critical Info", 
            description: "Large Language Model provided incorrect safety procedure information during a critical system update. The model generated false steps that could have led to data loss if followed. Immediate action was taken to correct the information and implement additional verification steps.", 
            severity: "High", 
            reported_at: "2025-04-01T14:30:00Z" 
        },
        { 
            id: 3, 
            title: "Minor Data Leak via Chatbot", 
            description: "Chatbot inadvertently exposed non-sensitive user metadata through an API response. The issue was quickly identified and patched within 2 hours. No sensitive information was compromised.", 
            severity: "Low",
            reported_at: "2025-03-20T09:15:00Z" 
        }
    ]);

    const [filter, setFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedIncident, setExpandedIncident] = useState(null);
    const [showReportForm, setShowReportForm] = useState(false);
    const [newIncident, setNewIncident] = useState({
        title: "",
        description: "",
        severity: "Low"
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newIncident.title || !newIncident.description) return;

        const newIncidentData = {
            id: incidents.length + 1,
            ...newIncident,
            reported_at: new Date().toISOString()
        };

        setIncidents([newIncidentData, ...incidents]);
        setNewIncident({ title: "", description: "", severity: "Low" });
        setShowReportForm(false);
    };

    const filteredAndSortedIncidents = incidents
        .filter(incident => {
            if (!searchQuery) return true;
            const searchLower = searchQuery.toLowerCase();
            return (
                incident.title.toLowerCase().includes(searchLower) ||
                incident.description.toLowerCase().includes(searchLower)
            );
        })
        .filter(incident => filter === "All" || incident.severity === filter)
        .sort((a, b) => {
            const dateA = new Date(a.reported_at);
            const dateB = new Date(b.reported_at);
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

    const highlightText = (text) => {
        if (!searchQuery) return text;
        const regex = new RegExp(`(${searchQuery})`, 'gi');
        return text.split(regex).map((part, i) => 
            regex.test(part) ? <span key={i} className={styles.highlight}>{part}</span> : part
        );
    };

    return (
        <section className={styles.incidentSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>AI Safety Incidents Tracker</h2>
                    <p className={styles.subheading}>Easily report, filter, sort, and view critical AI safety incidents in one place.</p>
                </div>

                <div className={styles.controls}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search by title or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <div className={styles.filterControls}>
                        <select 
                            value={filter} 
                            onChange={(e) => setFilter(e.target.value)}
                            className={styles.select}
                        >
                            <option value="All">All Severity</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <select 
                            value={sortOrder} 
                            onChange={(e) => setSortOrder(e.target.value)}
                            className={styles.select}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                        <button 
                            className={styles.toggleButton}
                            onClick={() => setShowReportForm(!showReportForm)}
                        >
                            {showReportForm ? 'Hide Form' : 'Report New'}
                        </button>
                    </div>
                </div>

                <form 
                    onSubmit={handleSubmit} 
                    className={`${styles.reportForm} ${showReportForm ? styles.visible : ''}`}
                >
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Incident Title"
                            value={newIncident.title}
                            onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <textarea
                            placeholder="Incident Description"
                            value={newIncident.description}
                            onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                            className={styles.textarea}
                            required
                        />
                    </div>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="Low"
                                checked={newIncident.severity === "Low"}
                                onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
                            />
                            Low
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="Medium"
                                checked={newIncident.severity === "Medium"}
                                onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
                            />
                            Medium
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="High"
                                checked={newIncident.severity === "High"}
                                onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
                            />
                            High
                        </label>
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>

                <div className={styles.incidentsList}>
                    {filteredAndSortedIncidents.map(incident => (
                        <div 
                            key={incident.id} 
                            className={`${styles.incidentCard} ${styles[incident.severity.toLowerCase()]}`}
                        >
                            <div className={styles.incidentHeader}>
                                <h3 className={styles.incidentTitle}>
                                    {highlightText(incident.title)}
                                </h3>
                                <div className={styles.incidentMeta}>
                                    <span className={styles.severity}>{incident.severity}</span>
                                    <span className={styles.date}>
                                        {formatDate(incident.reported_at)}
                                    </span>
                                </div>
                            </div>
                            <button 
                                className={styles.viewDetailsButton}
                                onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                            >
                                {expandedIncident === incident.id ? 'Hide' : 'View'}
                            </button>
                            {expandedIncident === incident.id && (
                                <div className={styles.incidentDescription}>
                                    {highlightText(incident.description)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IncidentSection; 